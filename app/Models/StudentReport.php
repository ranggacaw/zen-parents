<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'term',
        'school_year',
        'summary',
        'academic_scores',
        'behavior',
        'extracurricular',
        'religious_activities',
        'advice',
        'physical_development',
        'final_average',
    ];

    protected function casts(): array
    {
        return [
            'academic_scores' => 'array',
            'behavior' => 'array',
            'extracurricular' => 'array',
            'religious_activities' => 'array',
            'physical_development' => 'array',
            'final_average' => 'decimal:1',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
