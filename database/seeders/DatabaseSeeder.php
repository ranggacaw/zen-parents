<?php

namespace Database\Seeders;

use App\Models\AcademicClass;
use App\Models\AcademyMaterial;
use App\Models\Activity;
use App\Models\Applicant;
use App\Models\Article;
use App\Models\AttendanceRecord;
use App\Models\Conversation;
use App\Models\EventRegistration;
use App\Models\Household;
use App\Models\LearningPlan;
use App\Models\Message;
use App\Models\PartnerPromotion;
use App\Models\PerformanceSnapshot;
use App\Models\SchoolEvent;
use App\Models\Student;
use App\Models\StudentReport;
use App\Models\StudentSchedule;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $household = Household::create([
            'name' => 'Rahman Household',
            'primary_contact_name' => 'Alya Rahman',
            'primary_email' => 'parent@example.com',
            'primary_phone' => '0812-0000-1234',
            'spouse_name' => 'Rafi Rahman',
            'spouse_email' => 'rafi@example.com',
            'spouse_phone' => '0812-0000-5678',
            'guardian_name' => 'Grandma Sari',
            'guardian_phone' => '0812-0000-9012',
            'address_line' => 'Jl. Melati No. 12',
            'city' => 'Bandung',
                'province' => 'Jawa Barat',
                'postal_code' => '40115',
            'province' => 'West Java',
            'postal_code' => '40115',
        ]);

        $user = User::factory()->create([
            'household_id' => $household->id,
            'name' => 'Alya Rahman',
            'preferred_name' => 'Alya',
            'email' => 'parent@example.com',
            'phone' => '0812-0000-1234',
            'email_verified_at' => now(),
        ]);

        $class = AcademicClass::create([
            'name' => 'Kindergarten B - Sunflower',
            'level' => 'Kindergarten B',
            'school_year' => '2026/2027',
            'homeroom_teacher' => 'Ms. Intan',
        ]);

        $student = Student::create([
            'household_id' => $household->id,
            'academic_class_id' => $class->id,
            'full_name' => 'Zain Rahman',
            'nickname' => 'Zain',
            'gender' => 'Male',
            'birth_date' => '2020-02-20',
            'status' => 'active',
            'school_year' => '2026/2027',
            'admission_number' => 'STU-2026-001',
            'health_notes' => 'Mild peanut allergy.',
            'family_notes' => 'Picked up by parent or grandmother.',
            'transport_mode' => 'Private pickup',
        ]);

        foreach ([
            ['Monday', '08:00', '09:00', 'Language Arts', 'Rainbow Room'],
            ['Monday', '09:15', '10:00', 'Religious Activities', 'Rainbow Room'],
            ['Tuesday', '08:00', '09:00', 'Numeracy', 'Sunflower Room'],
        ] as [$day, $start, $end, $subject, $room]) {
            StudentSchedule::create([
                'student_id' => $student->id,
                'day_name' => $day,
                'starts_at' => $start,
                'ends_at' => $end,
                'subject' => $subject,
                'room' => $room,
                'teacher_name' => 'Ms. Intan',
            ]);
        }

        LearningPlan::create([
            'student_id' => $student->id,
            'plan_date' => now()->toDateString(),
            'title' => 'Garden Discovery',
            'summary' => 'Students observe plants and describe growth stages.',
            'focus' => 'Science and communication',
            'notes' => 'Bring a hat and water bottle.',
        ]);

        foreach ([
            [now()->subDays(2)->toDateString(), 'present', 'Arrived on time.'],
            [now()->subDay()->toDateString(), 'present', 'Participated actively.'],
            [now()->toDateString(), 'late', 'Traffic delay.'],
        ] as [$date, $status, $notes]) {
            AttendanceRecord::create([
                'student_id' => $student->id,
                'attendance_date' => $date,
                'status' => $status,
                'notes' => $notes,
            ]);
        }

        StudentReport::create([
            'student_id' => $student->id,
            'term' => 'Semester 1',
            'school_year' => '2026/2027',
            'summary' => 'Strong growth in literacy, collaboration, and confidence.',
            'academic_scores' => [
                ['subject' => 'Language Arts', 'score' => 91],
                ['subject' => 'Numeracy', 'score' => 87],
                ['subject' => 'Science Exploration', 'score' => 89],
            ],
            'behavior' => [
                'focus' => 'Very good',
                'teamwork' => 'Excellent',
            ],
            'extracurricular' => [
                'music' => 'Enjoys rhythm and movement.',
            ],
            'religious_activities' => [
                'daily_prayer' => 'Consistent participation',
            ],
            'advice' => 'Continue reading aloud at home and encourage journaling.',
            'physical_development' => [
                'gross_motor' => 'Age appropriate',
                'fine_motor' => 'Strong pencil grip',
            ],
            'final_average' => 89.0,
        ]);

        foreach ([
            ['Baseline', now()->subMonths(2), 82, 80, 84],
            ['Mid-term', now()->subMonth(), 86, 85, 87],
            ['Current', now(), 89, 88, 90],
        ] as [$label, $date, $overall, $knowledge, $skills]) {
            PerformanceSnapshot::create([
                'student_id' => $student->id,
                'label' => $label,
                'snapshot_date' => Carbon::parse($date)->toDateString(),
                'overall_score' => $overall,
                'knowledge_score' => $knowledge,
                'skills_score' => $skills,
                'subject_scores' => [
                    'Language Arts' => $overall + 1,
                    'Numeracy' => $overall - 1,
                ],
                'benchmark' => [
                    'average' => 84,
                    'highest' => 93,
                ],
            ]);
        }

        $applicant = Applicant::create([
            'household_id' => $household->id,
            'full_name' => 'Nadia Rahman',
            'status' => 'document_review',
            'school_year' => '2027/2028',
            'grade_preference' => 'Nursery',
            'special_needs' => false,
            'transport_mode' => 'School shuttle',
            'aid_program' => 'Sibling discount',
            'distance_km' => 4.2,
            'commute_minutes' => 18,
            'demographic_data' => [
                'gender' => 'Female',
                'religion' => 'Islam',
                'birth_date' => '2022-05-05',
            ],
            'family_data' => [
                'father_name' => 'Rafi Rahman',
                'mother_name' => 'Alya Rahman',
                'parent_phone' => '0812-0000-1234',
                'family_card_number' => '3273010101010001',
            ],
            'address_data' => [
                'address_line' => 'Jl. Melati No. 12',
                'city' => 'Bandung',
                'province' => 'Jawa Barat',
                'postal_code' => '40115',
            ],
            'health_data' => [
                'blood_type' => 'O',
                'allergies' => 'None',
                'medical_notes' => 'No known conditions',
            ],
            'supporting_document_paths' => ['admissions/documents/family-card.pdf'],
            'payment_proof_path' => 'admissions/payment-proofs/registration-fee.png',
            'status_notes' => 'Admissions team requested original immunization record at interview.',
        ]);

        $event = SchoolEvent::create([
            'title' => 'Family Field Trip',
            'summary' => 'A guided science museum visit for children and guardians.',
            'starts_at' => now()->addWeeks(2),
            'ends_at' => now()->addWeeks(2)->addHours(4),
            'location' => 'Bandung Science Museum',
            'logistics' => 'Meet at school gate at 07:15. Wear the sports uniform.',
            'cost' => 175000,
            'requires_payment' => true,
            'payment_transaction_label' => 'Field trip registration',
        ]);

        Transaction::create([
            'household_id' => $household->id,
            'reference' => 'INV-2026-0001',
            'category' => 'tuition',
            'title' => 'April Tuition',
            'amount' => 850000,
            'due_date' => now()->addDays(5)->toDateString(),
            'status' => 'pending',
            'notes' => 'Pay before the 5th to avoid late reminders.',
        ]);

        Transaction::create([
            'household_id' => $household->id,
            'school_event_id' => $event->id,
            'reference' => 'INV-2026-0002',
            'category' => 'event',
            'title' => 'Family Field Trip',
            'amount' => 175000,
            'due_date' => now()->addWeek()->toDateString(),
            'status' => 'pending',
            'notes' => 'Auto-created from event registration.',
        ]);

        Transaction::create([
            'household_id' => $household->id,
            'reference' => 'INV-2026-0003',
            'category' => 'extracurricular',
            'title' => 'Music Club',
            'amount' => 250000,
            'due_date' => now()->subDays(10)->toDateString(),
            'paid_at' => now()->subDays(8),
            'status' => 'paid',
            'notes' => 'Paid via bank transfer.',
        ]);

        EventRegistration::create([
            'household_id' => $household->id,
            'school_event_id' => $event->id,
            'status' => 'registered',
            'attendees' => ['Alya Rahman', 'Zain Rahman'],
        ]);

        $conversation = Conversation::create([
            'household_id' => $household->id,
            'applicant_id' => $applicant->id,
            'subject' => 'Admissions follow-up: Nadia Rahman',
            'contact_name' => 'Admissions Desk',
            'contact_role' => 'Admissions',
            'status' => 'open',
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_type' => 'staff',
            'sender_name' => 'Admissions Desk',
            'body' => 'Please bring the original immunization record to the upcoming interview.',
            'attachment_name' => 'checklist.pdf',
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_type' => 'parent',
            'sender_name' => $user->preferred_name,
            'body' => 'Thank you, we will bring it on the scheduled date.',
        ]);

        Article::create([
            'title' => 'How We Build Reading Habits at Home',
            'excerpt' => 'Simple routines parents can use to reinforce classroom literacy.',
            'body' => '<p>Create a calm reading corner, keep sessions short, and let children retell the story in their own words.</p>',
            'published_at' => now()->subDays(2),
        ]);

        AcademyMaterial::create([
            'title' => 'Week 4 Learning Pack',
            'description' => 'Printable activities and teacher notes for the current theme.',
            'content_html' => '<h2>Week 4 Learning Pack</h2><p>This material covers language, numeracy, and sensory exploration tasks for home review.</p><ul><li>Trace the letter M</li><li>Count objects from 1 to 10</li><li>Discuss favorite healthy foods</li></ul>',
            'file_label' => 'learning-pack-week-4.pdf',
            'published_at' => now()->subDay(),
        ]);

        Activity::create([
            'title' => 'Saturday Family Yoga',
            'summary' => 'Open mat session for parents and children.',
            'details' => 'Join the wellness team for a relaxed family movement session in the school hall.',
            'starts_at' => now()->addDays(10),
            'location' => 'School Hall',
        ]);

        PartnerPromotion::create([
            'title' => 'Healthy Lunchbox Partner Offer',
            'summary' => 'Discounted weekly lunchbox plan for enrolled families.',
            'body' => 'Families can activate a partner lunchbox subscription with nutrition notes tailored to early childhood needs.',
            'cta_label' => 'View Partner Offer',
            'cta_url' => 'https://example.com/partner-offer',
        ]);
    }
}
