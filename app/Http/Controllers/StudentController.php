<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function show(Request $request, Student $student): Response
    {
        abort_unless($student->household_id === $request->user()->household_id, 403);

        $student->load([
            'academicClass',
            'schedules',
            'learningPlans',
            'attendanceRecords',
            'reports',
            'performanceSnapshots',
        ]);

        return Inertia::render('Students/Show', [
            'student' => [
                'id' => $student->id,
                'full_name' => $student->full_name,
                'nickname' => $student->nickname,
                'status' => $student->status,
                'school_year' => $student->school_year,
                'admission_number' => $student->admission_number,
                'transport_mode' => $student->transport_mode,
                'health_notes' => $student->health_notes,
                'family_notes' => $student->family_notes,
                'class_name' => $student->academicClass?->name,
                'homeroom_teacher' => $student->academicClass?->homeroom_teacher,
                'schedule' => $student->schedules->map(fn ($schedule) => [
                    'day_name' => $schedule->day_name,
                    'starts_at' => $schedule->starts_at,
                    'ends_at' => $schedule->ends_at,
                    'subject' => $schedule->subject,
                    'room' => $schedule->room,
                    'teacher_name' => $schedule->teacher_name,
                ]),
                'learning_plans' => $student->learningPlans->sortByDesc('plan_date')->values()->map(fn ($plan) => [
                    'plan_date' => $plan->plan_date?->toDateString(),
                    'title' => $plan->title,
                    'summary' => $plan->summary,
                    'focus' => $plan->focus,
                    'notes' => $plan->notes,
                ]),
                'attendance' => $student->attendanceRecords->sortByDesc('attendance_date')->values()->map(fn ($record) => [
                    'attendance_date' => $record->attendance_date?->toDateString(),
                    'status' => $record->status,
                    'notes' => $record->notes,
                ]),
                'reports' => $student->reports->sortByDesc('created_at')->values()->map(fn ($report) => [
                    'term' => $report->term,
                    'school_year' => $report->school_year,
                    'summary' => $report->summary,
                    'academic_scores' => $report->academic_scores,
                    'behavior' => $report->behavior,
                    'extracurricular' => $report->extracurricular,
                    'religious_activities' => $report->religious_activities,
                    'advice' => $report->advice,
                    'physical_development' => $report->physical_development,
                    'final_average' => (float) ($report->final_average ?? 0),
                ]),
                'analytics' => $student->performanceSnapshots->sortBy('snapshot_date')->values()->map(fn ($snapshot) => [
                    'label' => $snapshot->label,
                    'snapshot_date' => $snapshot->snapshot_date?->toDateString(),
                    'overall_score' => (float) ($snapshot->overall_score ?? 0),
                    'knowledge_score' => (float) ($snapshot->knowledge_score ?? 0),
                    'skills_score' => (float) ($snapshot->skills_score ?? 0),
                    'subject_scores' => $snapshot->subject_scores,
                    'benchmark' => $snapshot->benchmark,
                ]),
            ],
        ]);
    }
}
