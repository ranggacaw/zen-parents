<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConversationController extends Controller
{
    public function index(Request $request): Response
    {
        $conversations = $request->user()->household->conversations()->with('messages', 'applicant')->latest()->get();

        return Inertia::render('Conversations/Index', [
            'staffContacts' => [
                ['name' => 'Admissions Desk', 'role' => 'Admissions'],
                ['name' => 'Finance Office', 'role' => 'Finance'],
                ['name' => 'Homeroom Team', 'role' => 'Academics'],
            ],
            'conversations' => $conversations->map(fn ($conversation) => [
                'id' => $conversation->id,
                'subject' => $conversation->subject,
                'contact_name' => $conversation->contact_name,
                'contact_role' => $conversation->contact_role,
                'status' => $conversation->status,
                'applicant_name' => $conversation->applicant?->full_name,
                'last_message' => optional($conversation->messages->last())->body,
            ]),
        ]);
    }

    public function show(Request $request, Conversation $conversation): Response
    {
        abort_unless($conversation->household_id === $request->user()->household_id, 403);

        $conversation->load('messages', 'applicant');

        return Inertia::render('Conversations/Show', [
            'conversation' => [
                'id' => $conversation->id,
                'subject' => $conversation->subject,
                'contact_name' => $conversation->contact_name,
                'contact_role' => $conversation->contact_role,
                'status' => $conversation->status,
                'applicant_name' => $conversation->applicant?->full_name,
                'messages' => $conversation->messages->map(fn ($message) => [
                    'id' => $message->id,
                    'sender_type' => $message->sender_type,
                    'sender_name' => $message->sender_name,
                    'body' => $message->body,
                    'attachment_name' => $message->attachment_name,
                    'created_at' => $message->created_at?->toIso8601String(),
                ]),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'conversation_id' => ['nullable', 'integer'],
            'subject' => ['nullable', 'string', 'max:255'],
            'contact_name' => ['required_without:conversation_id', 'string', 'max:255'],
            'contact_role' => ['required_without:conversation_id', 'string', 'max:255'],
            'applicant_id' => ['nullable', 'integer'],
            'body' => ['required', 'string'],
            'attachment_name' => ['nullable', 'string', 'max:255'],
        ]);

        $conversation = $validated['conversation_id']
            ? Conversation::query()->where('household_id', $request->user()->household_id)->findOrFail($validated['conversation_id'])
            : Conversation::create([
                'household_id' => $request->user()->household_id,
                'applicant_id' => $validated['applicant_id'] ?? null,
                'subject' => $validated['subject'] ?: 'General enquiry',
                'contact_name' => $validated['contact_name'],
                'contact_role' => $validated['contact_role'],
                'status' => 'open',
            ]);

        if (! empty($validated['applicant_id'])) {
            $applicant = Applicant::query()->where('household_id', $request->user()->household_id)->findOrFail($validated['applicant_id']);
            $conversation->update(['applicant_id' => $applicant->id]);
        }

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_type' => 'parent',
            'sender_name' => $request->user()->preferred_name ?: $request->user()->name,
            'body' => $validated['body'],
            'attachment_name' => $validated['attachment_name'] ?? null,
        ]);

        return redirect()->route('conversations.show', $conversation);
    }
}
