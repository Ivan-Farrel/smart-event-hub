<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CommunityController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    // --- COMMUNITY SYSTEM ---
    // PENTING: Pindah create ke atas SLUG biar gak 404
    Route::get('/communities/create', [CommunityController::class, 'create'])->name('communities.create');
    Route::post('/communities', [CommunityController::class, 'store'])->name('communities.store');
    
    Route::get('/communities', [CommunityController::class, 'index'])->name('communities.index');
    Route::get('/communities/{community:slug}', [CommunityController::class, 'show'])->name('communities.show');
    Route::post('/communities/{community:slug}/join', [CommunityController::class, 'join'])->name('communities.join');

    // --- EVENT SYSTEM ---
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::get('/events/{event:slug}', [EventController::class, 'show'])->name('events.show');
    
    Route::post('/events/{event:slug}/join', [EventController::class, 'join'])
        ->middleware('role:member,organizer')
        ->name('events.join');

    // --- MANAGEMENT ROLE (ORGANIZER & ADMIN) ---
    Route::middleware('role:organizer,admin')->group(function () {
        Route::resource('events', EventController::class)->except(['index', 'show'])->parameters([
            'events' => 'event:slug'
        ]);
        Route::get('/my-communities', [CommunityController::class, 'myCommunities'])->name('communities.mine');
    });

    // --- KHUSUS ADMIN ---
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/approvals', [CommunityController::class, 'pendingApprovals'])->name('admin.approvals');
        Route::patch('/admin/communities/{community}/approve', [CommunityController::class, 'approve'])->name('admin.communities.approve');
        Route::patch('/admin/events/{event}/approve', [EventController::class, 'approve'])->name('admin.events.approve');
    });
});

require __DIR__.'/auth.php';