<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\StudentReport;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class StudentCenterController extends Controller
{
    public function index(Request $request): Response
    {
        $students = Student::query()
            ->where('household_id', $request->user()->household_id)
            ->with('academicClass')
            ->orderBy('full_name')
            ->get();

        return Inertia::render('StudentCenter/Index', [
            'students' => $students->map(fn (Student $student) => $this->studentCard($student)),
        ]);
    }

    public function show(Request $request, Student $student): Response
    {
        return Inertia::render('StudentCenter/Hub', [
            'student' => $this->studentPayload($this->loadStudent($request, $student)),
        ]);
    }

    public function schedule(Request $request, Student $student): Response
    {
        return Inertia::render('StudentCenter/Schedule', [
            'student' => $this->studentPayload($this->loadStudent($request, $student)),
        ]);
    }

    public function rkh(Request $request, Student $student): Response
    {
        return Inertia::render('StudentCenter/Rkh', [
            'student' => $this->studentPayload($this->loadStudent($request, $student)),
        ]);
    }

    public function reports(Request $request, Student $student): Response
    {
        return Inertia::render('StudentCenter/Reports/Index', [
            'student' => $this->studentPayload($this->loadStudent($request, $student)),
        ]);
    }

    public function reportDetail(Request $request, Student $student, StudentReport $report): Response
    {
        $student = $this->loadStudent($request, $student);

        abort_unless($report->student_id === $student->id, 404);

        return Inertia::render('StudentCenter/Reports/Show', [
            'student' => $this->studentPayload($student),
            'report' => $this->reportPayload($report),
        ]);
    }

    public function attendance(Request $request, Student $student): Response
    {
        return Inertia::render('StudentCenter/Attendance', [
            'student' => $this->studentPayload($this->loadStudent($request, $student)),
        ]);
    }

    public function analytics(Request $request, Student $student): Response
    {
        return Inertia::render('StudentCenter/Analytics/Index', [
            'student' => $this->studentPayload($this->loadStudent($request, $student)),
        ]);
    }

    public function analyticsFinal(Request $request, Student $student): Response
    {
        return Inertia::render('StudentCenter/Analytics/Final', [
            'student' => $this->studentPayload($this->loadStudent($request, $student)),
        ]);
    }

    public function analyticsSubjects(Request $request, Student $student): Response
    {
        return Inertia::render('StudentCenter/Analytics/Subjects', [
            'student' => $this->studentPayload($this->loadStudent($request, $student)),
        ]);
    }

    private function loadStudent(Request $request, Student $student): Student
    {
        abort_unless($student->household_id === $request->user()->household_id, 403);

        $student->loadMissing([
            'academicClass',
            'schedules',
            'learningPlans',
            'attendanceRecords',
            'reports',
            'performanceSnapshots',
        ]);

        return $student;
    }

    private function studentCard(Student $student): array
    {
        return [
            'id' => $student->id,
            'full_name' => $student->full_name,
            'nickname' => $student->nickname,
            'status' => $student->status,
            'school_year' => $student->school_year,
            'class_name' => $student->academicClass?->name,
            'homeroom_teacher' => $student->academicClass?->homeroom_teacher,
            'avatar_url' => '/images/anakku/student-card.svg',
        ];
    }

    private function studentPayload(Student $student): array
    {
        $reports = $student->reports
            ->sortByDesc('created_at')
            ->values()
            ->map(fn (StudentReport $report) => $this->reportPayload($report));

        $analytics = $student->performanceSnapshots
            ->sortBy('snapshot_date')
            ->values()
            ->map(fn ($snapshot) => [
                'label' => $snapshot->label,
                'snapshot_date' => $snapshot->snapshot_date?->toDateString(),
                'overall_score' => (float) ($snapshot->overall_score ?? 0),
                'knowledge_score' => (float) ($snapshot->knowledge_score ?? 0),
                'skills_score' => (float) ($snapshot->skills_score ?? 0),
                'subject_scores' => collect($snapshot->subject_scores ?? [])
                    ->map(fn ($score, $subject) => [
                        'subject' => $subject,
                        'score' => (float) $score,
                    ])
                    ->values(),
                'benchmark' => [
                    'average' => (float) data_get($snapshot->benchmark, 'average', 0),
                    'highest' => (float) data_get($snapshot->benchmark, 'highest', 0),
                ],
            ]);

        return [
            'id' => $student->id,
            'full_name' => $student->full_name,
            'nickname' => $student->nickname,
            'status' => $student->status,
            'school_year' => $student->school_year,
            'admission_number' => $student->admission_number,
            'transport_mode' => $student->transport_mode,
            'health_notes' => $student->health_notes,
            'family_notes' => $student->family_notes,
            'gender' => $student->gender,
            'birth_date' => $student->birth_date?->toDateString(),
            'class_name' => $student->academicClass?->name,
            'homeroom_teacher' => $student->academicClass?->homeroom_teacher,
            'avatar_url' => '/images/anakku/student-card.svg',
            'analytics_badge_url' => '/images/anakku/analytics-badge.svg',
            'report_badge_url' => '/images/anakku/report-badge.svg',
            'schedule' => $this->orderedSchedules($student->schedules)->map(fn ($schedule) => [
                'day_name' => $schedule->day_name,
                'starts_at' => $schedule->starts_at,
                'ends_at' => $schedule->ends_at,
                'subject' => $schedule->subject,
                'room' => $schedule->room,
                'teacher_name' => $schedule->teacher_name,
            ]),
            'learning_plans' => $student->learningPlans
                ->sortByDesc('plan_date')
                ->values()
                ->map(fn ($plan) => [
                    'plan_date' => $plan->plan_date?->toDateString(),
                    'title' => $plan->title,
                    'summary' => $plan->summary,
                    'focus' => $plan->focus,
                    'notes' => $plan->notes,
                ]),
            'attendance' => $student->attendanceRecords
                ->sortByDesc('attendance_date')
                ->values()
                ->map(fn ($record) => [
                    'attendance_date' => $record->attendance_date?->toDateString(),
                    'status' => $record->status,
                    'notes' => $record->notes,
                ]),
            'reports' => $reports,
            'analytics' => $analytics,
            'summary_cards' => [
                [
                    'label' => 'Class',
                    'value' => $student->academicClass?->name ?? 'Class placement pending',
                ],
                [
                    'label' => 'Teacher',
                    'value' => $student->academicClass?->homeroom_teacher ?? 'Teacher not assigned yet',
                ],
                [
                    'label' => 'Transport',
                    'value' => $student->transport_mode ?? 'No transport plan',
                ],
                [
                    'label' => 'Reports',
                    'value' => $reports->count().' published',
                ],
            ],
            'legacy_interactions' => [
                [
                    'key' => 'detailed-b',
                    'status' => 'mapped',
                    'label' => 'Detailed breakdown',
                    'description' => 'This clone keeps the deeper report breakdown inside the report detail page.',
                ],
                [
                    'key' => 'menu-story',
                    'status' => 'safe-fallback',
                    'label' => 'Story overlay unavailable',
                    'description' => 'The legacy story drawer is not defined in this repository, so the clone shows a non-interactive note instead of a dead tap.',
                ],
                [
                    'key' => 'menu-transaction-1',
                    'status' => 'remapped',
                    'label' => 'Finance handoff',
                    'description' => 'Transaction details belong to the finance module in this app, so the clone routes parents back there.',
                    'href' => route('finance.index'),
                ],
            ],
        ];
    }

    private function reportPayload(StudentReport $report): array
    {
        return [
            'id' => $report->id,
            'term' => $report->term,
            'school_year' => $report->school_year,
            'summary' => $report->summary,
            'academic_scores' => collect($report->academic_scores ?? [])->map(fn ($score) => [
                'subject' => data_get($score, 'subject'),
                'score' => (float) data_get($score, 'score', 0),
            ])->values(),
            'behavior' => collect($report->behavior ?? [])->map(fn ($value, $label) => [
                'label' => $label,
                'value' => $value,
            ])->values(),
            'extracurricular' => collect($report->extracurricular ?? [])->map(fn ($value, $label) => [
                'label' => $label,
                'value' => $value,
            ])->values(),
            'religious_activities' => collect($report->religious_activities ?? [])->map(fn ($value, $label) => [
                'label' => $label,
                'value' => $value,
            ])->values(),
            'physical_development' => collect($report->physical_development ?? [])->map(fn ($value, $label) => [
                'label' => $label,
                'value' => $value,
            ])->values(),
            'advice' => $report->advice,
            'final_average' => (float) ($report->final_average ?? 0),
        ];
    }

    private function orderedSchedules(Collection $schedules): Collection
    {
        $order = [
            'Monday' => 1,
            'Tuesday' => 2,
            'Wednesday' => 3,
            'Thursday' => 4,
            'Friday' => 5,
            'Saturday' => 6,
            'Sunday' => 7,
        ];

        return $schedules->sortBy(fn ($schedule) => [
            $order[$schedule->day_name] ?? 99,
            $schedule->starts_at,
        ])->values();
    }
}
