<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/manifest.webmanifest', function () {
    return Response::file(public_path('manifest.webmanifest'), [
        'Content-Type' => 'application/manifest+json',
    ]);
});

Route::get('/sw.js', function () {
    return Response::file(public_path('sw.js'), [
        'Content-Type' => 'application/javascript',
    ]);
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', DashboardController::class)->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');

    Route::get('/applicants/create', [ApplicantController::class, 'create'])->name('applicants.create');
    Route::post('/applicants', [ApplicantController::class, 'store'])->name('applicants.store');
    Route::get('/applicants/{applicant}', [ApplicantController::class, 'show'])->name('applicants.show');
    Route::post('/applicants/{applicant}/handoff', [ApplicantController::class, 'handoff'])->name('applicants.handoff');

    Route::get('/finance', [FinanceController::class, 'index'])->name('finance.index');
    Route::get('/events/{event}', [FinanceController::class, 'showEvent'])->name('events.show');

    Route::get('/conversations', [ConversationController::class, 'index'])->name('conversations.index');
    Route::post('/conversations', [ConversationController::class, 'store'])->name('conversations.store');
    Route::get('/conversations/{conversation}', [ConversationController::class, 'show'])->name('conversations.show');

    Route::get('/content', [ContentController::class, 'index'])->name('content.index');
    Route::get('/materials/{material}', [ContentController::class, 'showMaterial'])->name('materials.show');
});

require __DIR__.'/auth.php';
