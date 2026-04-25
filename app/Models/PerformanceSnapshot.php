<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PerformanceSnapshot extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'label',
        'snapshot_date',
        'overall_score',
        'knowledge_score',
        'skills_score',
        'subject_scores',
        'benchmark',
    ];

    protected function casts(): array
    {
        return [
            'snapshot_date' => 'date',
            'overall_score' => 'decimal:1',
            'knowledge_score' => 'decimal:1',
            'skills_score' => 'decimal:1',
            'subject_scores' => 'array',
            'benchmark' => 'array',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
