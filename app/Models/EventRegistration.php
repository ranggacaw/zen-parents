<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'household_id',
        'school_event_id',
        'status',
        'attendees',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'attendees' => 'array',
        ];
    }

    public function household(): BelongsTo
    {
        return $this->belongsTo(Household::class);
    }

    public function schoolEvent(): BelongsTo
    {
        return $this->belongsTo(SchoolEvent::class);
    }
}
