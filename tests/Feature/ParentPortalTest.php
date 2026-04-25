<?php

namespace Tests\Feature;

use App\Models\Applicant;
use App\Models\Conversation;
use App\Models\Household;
use App\Models\Student;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ParentPortalTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(DatabaseSeeder::class);
    }

    public function test_guest_is_redirected_from_parent_dashboard(): void
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_parent_can_only_access_their_own_student_record(): void
    {
        $user = User::where('email', 'parent@example.com')->firstOrFail();

        $otherHousehold = Household::create([
            'name' => 'Other Household',
            'primary_contact_name' => 'Other Parent',
        ]);

        $otherStudent = Student::create([
            'household_id' => $otherHousehold->id,
            'full_name' => 'Restricted Child',
            'status' => 'active',
            'school_year' => '2026/2027',
        ]);

        $this->actingAs($user)
            ->get(route('students.show', $otherStudent))
            ->assertForbidden();
    }

    public function test_parent_can_submit_ppdb_application_with_uploads(): void
    {
        Storage::fake('public');

        $user = User::where('email', 'parent@example.com')->firstOrFail();

        $response = $this->actingAs($user)->post(route('applicants.store'), [
            'full_name' => 'New Applicant',
            'school_year' => '2027/2028',
            'grade_preference' => 'Nursery',
            'gender' => 'Female',
            'birth_date' => '2022-08-01',
            'father_name' => 'Rafi Rahman',
            'mother_name' => 'Alya Rahman',
            'address_line' => 'Jl. Example No. 1',
            'payment_proof' => UploadedFile::fake()->image('proof.png'),
            'supporting_documents' => [UploadedFile::fake()->create('family-card.pdf', 100)],
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('applicants', [
            'household_id' => $user->household_id,
            'full_name' => 'New Applicant',
        ]);

        $applicant = Applicant::where('full_name', 'New Applicant')->firstOrFail();

        Storage::disk('public')->assertExists($applicant->payment_proof_path);
        Storage::disk('public')->assertExists($applicant->supporting_document_paths[0]);
    }

    public function test_admissions_handoff_creates_linked_conversation(): void
    {
        $user = User::where('email', 'parent@example.com')->firstOrFail();
        $applicant = Applicant::where('full_name', 'Nadia Rahman')->firstOrFail();

        $this->actingAs($user)
            ->post(route('applicants.handoff', $applicant))
            ->assertRedirect();

        $this->assertDatabaseHas('conversations', [
            'household_id' => $user->household_id,
            'applicant_id' => $applicant->id,
        ]);
    }

    public function test_finance_filter_scopes_visible_transactions(): void
    {
        $user = User::where('email', 'parent@example.com')->firstOrFail();

        $this->actingAs($user)
            ->get(route('finance.index', ['status' => 'paid']))
            ->assertOk()
            ->assertSee('Music Club')
            ->assertDontSee('April Tuition');
    }

    public function test_parent_can_reply_in_household_conversation(): void
    {
        $user = User::where('email', 'parent@example.com')->firstOrFail();
        $conversation = Conversation::firstOrFail();

        $this->actingAs($user)
            ->post(route('conversations.store'), [
                'conversation_id' => $conversation->id,
                'body' => 'Following up on the requested document.',
            ])
            ->assertRedirect(route('conversations.show', $conversation));

        $this->assertDatabaseHas('messages', [
            'conversation_id' => $conversation->id,
            'body' => 'Following up on the requested document.',
            'sender_type' => 'parent',
        ]);
    }

    public function test_pwa_manifest_and_service_worker_are_available(): void
    {
        $this->get('/manifest.webmanifest')
            ->assertOk()
            ->assertHeader('content-type', 'application/manifest+json');

        $this->get('/sw.js')
            ->assertOk()
            ->assertHeader('content-type', 'application/javascript');
    }
}
