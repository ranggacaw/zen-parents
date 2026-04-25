<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('households', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('primary_contact_name');
            $table->string('primary_email')->nullable();
            $table->string('primary_phone')->nullable();
            $table->string('spouse_name')->nullable();
            $table->string('spouse_email')->nullable();
            $table->string('spouse_phone')->nullable();
            $table->string('guardian_name')->nullable();
            $table->string('guardian_phone')->nullable();
            $table->string('address_line')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('status')->default('active');
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('household_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->string('preferred_name')->nullable()->after('name');
            $table->string('phone')->nullable()->after('email');
            $table->string('role')->default('parent')->after('phone');
        });

        Schema::create('academic_classes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('level');
            $table->string('school_year');
            $table->string('homeroom_teacher')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });

        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_id')->constrained()->cascadeOnDelete();
            $table->foreignId('academic_class_id')->nullable()->constrained('academic_classes')->nullOnDelete();
            $table->string('full_name');
            $table->string('nickname')->nullable();
            $table->string('gender')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('status')->default('active');
            $table->string('school_year');
            $table->string('admission_number')->nullable();
            $table->text('health_notes')->nullable();
            $table->text('family_notes')->nullable();
            $table->string('transport_mode')->nullable();
            $table->timestamps();
        });

        Schema::create('applicants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('status')->default('submitted');
            $table->string('school_year');
            $table->string('grade_preference');
            $table->boolean('special_needs')->default(false);
            $table->text('special_needs_notes')->nullable();
            $table->string('transport_mode')->nullable();
            $table->string('aid_program')->nullable();
            $table->decimal('distance_km', 5, 1)->nullable();
            $table->integer('commute_minutes')->nullable();
            $table->json('demographic_data')->nullable();
            $table->json('family_data')->nullable();
            $table->json('address_data')->nullable();
            $table->json('health_data')->nullable();
            $table->json('supporting_document_paths')->nullable();
            $table->string('payment_proof_path')->nullable();
            $table->text('status_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('student_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('day_name');
            $table->string('starts_at');
            $table->string('ends_at');
            $table->string('subject');
            $table->string('room')->nullable();
            $table->string('teacher_name')->nullable();
            $table->timestamps();
        });

        Schema::create('learning_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->date('plan_date');
            $table->string('title');
            $table->text('summary');
            $table->string('focus');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('attendance_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->date('attendance_date');
            $table->string('status');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('student_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('term');
            $table->string('school_year');
            $table->text('summary')->nullable();
            $table->json('academic_scores');
            $table->json('behavior')->nullable();
            $table->json('extracurricular')->nullable();
            $table->json('religious_activities')->nullable();
            $table->text('advice')->nullable();
            $table->json('physical_development')->nullable();
            $table->decimal('final_average', 5, 1)->nullable();
            $table->timestamps();
        });

        Schema::create('performance_snapshots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('label');
            $table->date('snapshot_date');
            $table->decimal('overall_score', 5, 1)->nullable();
            $table->decimal('knowledge_score', 5, 1)->nullable();
            $table->decimal('skills_score', 5, 1)->nullable();
            $table->json('subject_scores')->nullable();
            $table->json('benchmark')->nullable();
            $table->timestamps();
        });

        Schema::create('school_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('summary')->nullable();
            $table->dateTime('starts_at');
            $table->dateTime('ends_at')->nullable();
            $table->string('location')->nullable();
            $table->text('logistics')->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->boolean('requires_payment')->default(false);
            $table->string('registration_status')->default('open');
            $table->string('payment_transaction_label')->nullable();
            $table->timestamps();
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_id')->constrained()->cascadeOnDelete();
            $table->foreignId('school_event_id')->nullable()->constrained('school_events')->nullOnDelete();
            $table->string('reference')->unique();
            $table->string('category');
            $table->string('title');
            $table->decimal('amount', 10, 2);
            $table->date('due_date')->nullable();
            $table->dateTime('paid_at')->nullable();
            $table->string('status')->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_id')->constrained()->cascadeOnDelete();
            $table->foreignId('school_event_id')->constrained('school_events')->cascadeOnDelete();
            $table->string('status')->default('registered');
            $table->json('attendees')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_id')->constrained()->cascadeOnDelete();
            $table->foreignId('applicant_id')->nullable()->constrained()->nullOnDelete();
            $table->string('subject');
            $table->string('contact_name');
            $table->string('contact_role');
            $table->string('status')->default('open');
            $table->timestamps();
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->cascadeOnDelete();
            $table->string('sender_type');
            $table->string('sender_name');
            $table->text('body');
            $table->string('attachment_name')->nullable();
            $table->dateTime('read_at')->nullable();
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('excerpt')->nullable();
            $table->longText('body');
            $table->string('audience')->default('all');
            $table->dateTime('published_at')->nullable();
            $table->string('status')->default('published');
            $table->timestamps();
        });

        Schema::create('academy_materials', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->longText('content_html');
            $table->string('file_label')->nullable();
            $table->string('audience')->default('all');
            $table->dateTime('published_at')->nullable();
            $table->string('status')->default('published');
            $table->timestamps();
        });

        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('summary')->nullable();
            $table->longText('details');
            $table->dateTime('starts_at')->nullable();
            $table->string('location')->nullable();
            $table->string('status')->default('published');
            $table->timestamps();
        });

        Schema::create('partner_promotions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('summary')->nullable();
            $table->longText('body');
            $table->string('cta_label')->nullable();
            $table->string('cta_url')->nullable();
            $table->string('status')->default('published');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partner_promotions');
        Schema::dropIfExists('activities');
        Schema::dropIfExists('academy_materials');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversations');
        Schema::dropIfExists('event_registrations');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('school_events');
        Schema::dropIfExists('performance_snapshots');
        Schema::dropIfExists('student_reports');
        Schema::dropIfExists('attendance_records');
        Schema::dropIfExists('learning_plans');
        Schema::dropIfExists('student_schedules');
        Schema::dropIfExists('applicants');
        Schema::dropIfExists('students');
        Schema::dropIfExists('academic_classes');
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('household_id');
            $table->dropColumn(['preferred_name', 'phone', 'role']);
        });
        Schema::dropIfExists('households');
    }
};
