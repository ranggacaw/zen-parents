<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'day_name',
        'starts_at',
        'ends_at',
        'subject',
        'room',
        'teacher_name',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
