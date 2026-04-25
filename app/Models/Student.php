<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'household_id',
        'academic_class_id',
        'full_name',
        'nickname',
        'gender',
        'birth_date',
        'status',
        'school_year',
        'admission_number',
        'health_notes',
        'family_notes',
        'transport_mode',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
        ];
    }

    public function household(): BelongsTo
    {
        return $this->belongsTo(Household::class);
    }

    public function academicClass(): BelongsTo
    {
        return $this->belongsTo(AcademicClass::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(StudentSchedule::class);
    }

    public function learningPlans(): HasMany
    {
        return $this->hasMany(LearningPlan::class);
    }

    public function attendanceRecords(): HasMany
    {
        return $this->hasMany(AttendanceRecord::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(StudentReport::class);
    }

    public function performanceSnapshots(): HasMany
    {
        return $this->hasMany(PerformanceSnapshot::class);
    }
}
