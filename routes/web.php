<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController; // Pastikan ini di atas
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Halaman Welcome (Public)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// 2. Route yang WAJIB Login (auth)
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Event Management
    // Daftar semua event
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    
    // Detail satu event (Pake slug biar URL-nya cakep)
    Route::get('/events/{event:slug}', [EventController::class, 'show'])->name('events.show');

    Route::post('/events/{event:slug}/join', [EventController::class, 'join'])->name('events.join');
});

require __DIR__.'/auth.php';