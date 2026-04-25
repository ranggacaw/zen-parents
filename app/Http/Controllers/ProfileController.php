<?php

namespace App\Http\Controllers;

use App\Models\Household;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'household' => $request->user()->household,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'preferred_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,'.$request->user()->id],
            'phone' => ['nullable', 'string', 'max:255'],
            'household_name' => ['nullable', 'string', 'max:255'],
            'primary_phone' => ['nullable', 'string', 'max:255'],
            'spouse_name' => ['nullable', 'string', 'max:255'],
            'spouse_email' => ['nullable', 'email', 'max:255'],
            'spouse_phone' => ['nullable', 'string', 'max:255'],
            'guardian_name' => ['nullable', 'string', 'max:255'],
            'guardian_phone' => ['nullable', 'string', 'max:255'],
            'address_line' => ['nullable', 'string'],
            'city' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:50'],
        ]);

        $householdName = $validated['household_name'] ?? $request->user()->household?->name ?? $validated['name'].' Household';

        $request->user()->fill([
            'name' => $validated['name'],
            'preferred_name' => $validated['preferred_name'] ?? null,
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ]);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        $household = $request->user()->household ?: Household::create([
            'name' => $householdName,
            'primary_contact_name' => $request->user()->name,
            'primary_email' => $request->user()->email,
        ]);

        $household->update([
            'name' => $householdName,
            'primary_contact_name' => $validated['name'],
            'primary_email' => $validated['email'],
            'primary_phone' => $validated['primary_phone'] ?? $validated['phone'] ?? null,
            'spouse_name' => $validated['spouse_name'] ?? null,
            'spouse_email' => $validated['spouse_email'] ?? null,
            'spouse_phone' => $validated['spouse_phone'] ?? null,
            'guardian_name' => $validated['guardian_name'] ?? null,
            'guardian_phone' => $validated['guardian_phone'] ?? null,
            'address_line' => $validated['address_line'] ?? null,
            'city' => $validated['city'] ?? null,
            'province' => $validated['province'] ?? null,
            'postal_code' => $validated['postal_code'] ?? null,
        ]);

        if (! $request->user()->household_id) {
            $request->user()->update(['household_id' => $household->id]);
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
