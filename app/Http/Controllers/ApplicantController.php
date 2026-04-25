<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApplicantController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Applicants/Create', [
            'schoolYears' => ['2026/2027', '2027/2028'],
            'gradeOptions' => ['Toddler', 'Nursery', 'Kindergarten A', 'Kindergarten B', 'Primary 1'],
            'transportOptions' => ['Private pickup', 'School shuttle', 'Public transport'],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'school_year' => ['required', 'string', 'max:255'],
            'grade_preference' => ['required', 'string', 'max:255'],
            'special_needs' => ['nullable', 'boolean'],
            'special_needs_notes' => ['nullable', 'string'],
            'transport_mode' => ['nullable', 'string', 'max:255'],
            'aid_program' => ['nullable', 'string', 'max:255'],
            'distance_km' => ['nullable', 'numeric'],
            'commute_minutes' => ['nullable', 'integer'],
            'gender' => ['nullable', 'string', 'max:50'],
            'birth_date' => ['nullable', 'date'],
            'religion' => ['nullable', 'string', 'max:100'],
            'family_card_number' => ['nullable', 'string', 'max:100'],
            'father_name' => ['nullable', 'string', 'max:255'],
            'mother_name' => ['nullable', 'string', 'max:255'],
            'parent_phone' => ['nullable', 'string', 'max:255'],
            'address_line' => ['nullable', 'string'],
            'city' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:50'],
            'blood_type' => ['nullable', 'string', 'max:10'],
            'allergies' => ['nullable', 'string'],
            'medical_notes' => ['nullable', 'string'],
            'payment_proof' => ['nullable', 'file', 'max:4096'],
            'supporting_documents.*' => ['nullable', 'file', 'max:4096'],
        ]);

        $paymentProofPath = $request->file('payment_proof')?->store('admissions/payment-proofs', 'public');
        $supportingDocuments = collect($request->file('supporting_documents', []))
            ->filter()
            ->map(fn ($file) => $file->store('admissions/documents', 'public'))
            ->values()
            ->all();

        $applicant = Applicant::create([
            'household_id' => $request->user()->household_id,
            'full_name' => $validated['full_name'],
            'status' => 'submitted',
            'school_year' => $validated['school_year'],
            'grade_preference' => $validated['grade_preference'],
            'special_needs' => (bool) ($validated['special_needs'] ?? false),
            'special_needs_notes' => $validated['special_needs_notes'] ?? null,
            'transport_mode' => $validated['transport_mode'] ?? null,
            'aid_program' => $validated['aid_program'] ?? null,
            'distance_km' => $validated['distance_km'] ?? null,
            'commute_minutes' => $validated['commute_minutes'] ?? null,
            'demographic_data' => [
                'gender' => $validated['gender'] ?? null,
                'birth_date' => $validated['birth_date'] ?? null,
                'religion' => $validated['religion'] ?? null,
            ],
            'family_data' => [
                'family_card_number' => $validated['family_card_number'] ?? null,
                'father_name' => $validated['father_name'] ?? null,
                'mother_name' => $validated['mother_name'] ?? null,
                'parent_phone' => $validated['parent_phone'] ?? null,
            ],
            'address_data' => [
                'address_line' => $validated['address_line'] ?? null,
                'city' => $validated['city'] ?? null,
                'province' => $validated['province'] ?? null,
                'postal_code' => $validated['postal_code'] ?? null,
            ],
            'health_data' => [
                'blood_type' => $validated['blood_type'] ?? null,
                'allergies' => $validated['allergies'] ?? null,
                'medical_notes' => $validated['medical_notes'] ?? null,
            ],
            'supporting_document_paths' => $supportingDocuments,
            'payment_proof_path' => $paymentProofPath,
            'status_notes' => 'Submitted online by parent.',
        ]);

        return redirect()->route('applicants.show', $applicant);
    }

    public function show(Request $request, Applicant $applicant): Response
    {
        abort_unless($applicant->household_id === $request->user()->household_id, 403);

        $applicant->load('conversation.messages');

        return Inertia::render('Applicants/Show', [
            'applicant' => $applicant,
        ]);
    }

    public function handoff(Request $request, Applicant $applicant): RedirectResponse
    {
        abort_unless($applicant->household_id === $request->user()->household_id, 403);

        $conversation = Conversation::firstOrCreate(
            [
                'household_id' => $request->user()->household_id,
                'applicant_id' => $applicant->id,
            ],
            [
                'subject' => 'Admissions follow-up: '.$applicant->full_name,
                'contact_name' => 'Admissions Desk',
                'contact_role' => 'Admissions',
                'status' => 'open',
            ],
        );

        if ($conversation->messages()->doesntExist()) {
            Message::create([
                'conversation_id' => $conversation->id,
                'sender_type' => 'staff',
                'sender_name' => 'Admissions Desk',
                'body' => 'We have received the application. Reply here if you need clarification on status or documents.',
            ]);
        }

        return redirect()->route('conversations.show', $conversation);
    }
}
