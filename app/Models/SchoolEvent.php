<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SchoolEvent extends Model
{
    use HasFactory;

    protected $table = 'school_events';

    protected $fillable = [
        'title',
        'summary',
        'starts_at',
        'ends_at',
        'location',
        'logistics',
        'cost',
        'requires_payment',
        'registration_status',
        'payment_transaction_label',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'cost' => 'decimal:2',
            'requires_payment' => 'boolean',
        ];
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class, 'school_event_id');
    }
}
