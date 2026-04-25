<?php

namespace App\Http\Controllers;

use App\Models\AcademyMaterial;
use App\Models\Activity;
use App\Models\Article;
use App\Models\PartnerPromotion;
use App\Models\SchoolEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user()->load([
            'household.students.academicClass',
            'household.applicants',
            'household.transactions',
            'household.conversations.messages',
        ]);

        $household = $user->household;

        return Inertia::render('Dashboard', [
            'household' => $household,
            'students' => $household?->students
                ->sortBy('full_name')
                ->values()
                ->map(fn ($student) => [
                    'id' => $student->id,
                    'full_name' => $student->full_name,
                    'nickname' => $student->nickname,
                    'status' => $student->status,
                    'school_year' => $student->school_year,
                    'class_name' => $student->academicClass?->name,
                ]),
            'applicants' => $household?->applicants
                ->sortByDesc('updated_at')
                ->values()
                ->map(fn ($applicant) => [
                    'id' => $applicant->id,
                    'full_name' => $applicant->full_name,
                    'status' => $applicant->status,
                    'grade_preference' => $applicant->grade_preference,
                    'school_year' => $applicant->school_year,
                ]),
            'finance_summary' => [
                'pending_total' => (float) $household?->transactions->where('status', 'pending')->sum('amount'),
                'paid_total' => (float) $household?->transactions->where('status', 'paid')->sum('amount'),
                'overdue_total' => (float) $household?->transactions->where('status', 'overdue')->sum('amount'),
            ],
            'recent_transactions' => $household?->transactions
                ->sortByDesc('created_at')
                ->take(4)
                ->values()
                ->map(fn ($transaction) => [
                    'id' => $transaction->id,
                    'reference' => $transaction->reference,
                    'title' => $transaction->title,
                    'category' => $transaction->category,
                    'status' => $transaction->status,
                    'amount' => (float) $transaction->amount,
                    'due_date' => optional($transaction->due_date)?->toDateString(),
                ]),
            'upcoming_events' => SchoolEvent::query()
                ->orderBy('starts_at')
                ->take(4)
                ->get()
                ->map(fn ($event) => [
                    'id' => $event->id,
                    'title' => $event->title,
                    'starts_at' => $event->starts_at?->toIso8601String(),
                    'location' => $event->location,
                    'requires_payment' => $event->requires_payment,
                    'cost' => (float) ($event->cost ?? 0),
                ]),
            'conversation_overview' => $household?->conversations
                ->sortByDesc(function ($conversation) {
                    return optional($conversation->messages->last())->created_at ?? $conversation->updated_at;
                })
                ->take(4)
                ->values()
                ->map(fn ($conversation) => [
                    'id' => $conversation->id,
                    'subject' => $conversation->subject,
                    'contact_name' => $conversation->contact_name,
                    'contact_role' => $conversation->contact_role,
                    'last_message' => optional($conversation->messages->last())->body,
                ]),
            'featured_content' => [
                'materials' => AcademyMaterial::query()->latest('published_at')->take(2)->get(['id', 'title', 'description']),
                'articles' => Article::query()->latest('published_at')->take(2)->get(['id', 'title', 'excerpt']),
                'activities' => Activity::query()->latest('starts_at')->take(2)->get(['id', 'title', 'summary']),
                'partners' => PartnerPromotion::query()->latest()->take(1)->get(['id', 'title', 'summary', 'cta_label', 'cta_url']),
            ],
        ]);
    }
}
