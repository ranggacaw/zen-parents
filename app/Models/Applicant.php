<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Applicant extends Model
{
    use HasFactory;

    protected $fillable = [
        'household_id',
        'full_name',
        'status',
        'school_year',
        'grade_preference',
        'special_needs',
        'special_needs_notes',
        'transport_mode',
        'aid_program',
        'distance_km',
        'commute_minutes',
        'demographic_data',
        'family_data',
        'address_data',
        'health_data',
        'supporting_document_paths',
        'payment_proof_path',
        'status_notes',
    ];

    protected function casts(): array
    {
        return [
            'special_needs' => 'boolean',
            'distance_km' => 'decimal:1',
            'demographic_data' => 'array',
            'family_data' => 'array',
            'address_data' => 'array',
            'health_data' => 'array',
            'supporting_document_paths' => 'array',
        ];
    }

    public function household(): BelongsTo
    {
        return $this->belongsTo(Household::class);
    }

    public function conversation(): HasOne
    {
        return $this->hasOne(Conversation::class);
    }
}
