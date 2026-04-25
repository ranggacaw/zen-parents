<?php

namespace App\Http\Controllers;

use App\Models\SchoolEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FinanceController extends Controller
{
    public function index(Request $request): Response
    {
        $household = $request->user()->household;
        $status = $request->string('status')->toString();
        $category = $request->string('category')->toString();

        $transactions = $household->transactions()
            ->when($status, fn ($query) => $query->where('status', $status))
            ->when($category, fn ($query) => $query->where('category', $category))
            ->latest('due_date')
            ->get();

        return Inertia::render('Finance/Index', [
            'filters' => [
                'status' => $status,
                'category' => $category,
            ],
            'transactions' => $transactions->map(fn ($transaction) => [
                'id' => $transaction->id,
                'reference' => $transaction->reference,
                'title' => $transaction->title,
                'category' => $transaction->category,
                'status' => $transaction->status,
                'amount' => (float) $transaction->amount,
                'due_date' => optional($transaction->due_date)?->toDateString(),
                'paid_at' => optional($transaction->paid_at)?->toIso8601String(),
                'notes' => $transaction->notes,
                'event_id' => $transaction->school_event_id,
            ]),
            'events' => SchoolEvent::query()->orderBy('starts_at')->get()->map(fn ($event) => [
                'id' => $event->id,
                'title' => $event->title,
                'summary' => $event->summary,
                'starts_at' => $event->starts_at?->toIso8601String(),
                'location' => $event->location,
                'cost' => (float) ($event->cost ?? 0),
                'requires_payment' => $event->requires_payment,
                'registration_status' => $event->registration_status,
            ]),
        ]);
    }

    public function showEvent(SchoolEvent $event): Response
    {
        return Inertia::render('Finance/EventShow', [
            'event' => $event,
        ]);
    }
}
