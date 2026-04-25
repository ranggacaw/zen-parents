<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LearningPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'plan_date',
        'title',
        'summary',
        'focus',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'plan_date' => 'date',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
