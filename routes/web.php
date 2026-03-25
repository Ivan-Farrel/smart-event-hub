<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CommunityController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes - Smart Event Project
|--------------------------------------------------------------------------
*/

// 1. HALAMAN PUBLIC
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// 2. SEMUA ROUTE YANG BUTUH LOGIN
Route::middleware(['auth', 'verified'])->group(function () {
    
    /**
     * DASHBOARD SELECTOR
     * Satpam otomatis: Kalau admin akses /dashboard, lempar ke /admin/dashboard
     */
    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profile Management
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    // --- COMMUNITY SYSTEM ---
    Route::get('/communities', [CommunityController::class, 'index'])->name('communities.index');
    Route::get('/communities/create', [CommunityController::class, 'create'])->name('communities.create');
    Route::post('/communities', [CommunityController::class, 'store'])->name('communities.store');
    Route::get('/communities/{community:slug}', [CommunityController::class, 'show'])->name('communities.show');
    Route::post('/communities/{community:slug}/join', [CommunityController::class, 'join'])->name('communities.join');

    // --- EVENT SYSTEM ---
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::get('/events/{event:slug}', [EventController::class, 'show'])->name('events.show');
    Route::post('/events/{event:slug}/join', [EventController::class, 'join'])->name('events.join');

    // --- KHUSUS ROLE: ADMIN ---
    Route::middleware('role:admin')->group(function () {
        // Halaman Dashboard Utama Admin
        Route::get('/admin/dashboard', function () {
            return Inertia::render('Admin/Dashboard', [
                'stats' => [
                    'pending_communities' => \App\Models\Community::where('status', 'pending')->count(),
                    'total_users' => \App\Models\User::count(),
                    'total_events' => \App\Models\Event::count(), // Tambahan biar rame
                ]
            ]);
        })->name('admin.dashboard');

        // Fitur Approval
        Route::get('/admin/approvals', [CommunityController::class, 'pendingApprovals'])->name('admin.approvals');
        Route::patch('/admin/communities/{community}/approve', [CommunityController::class, 'approve'])->name('admin.communities.approve');
        Route::patch('/admin/events/{event}/approve', [EventController::class, 'approve'])->name('admin.events.approve');
    });

    // --- MANAGEMENT (ORGANIZER & ADMIN) ---
    Route::middleware('role:organizer,admin')->group(function () {
        Route::resource('events', EventController::class)->except(['index', 'show'])->parameters([
            'events' => 'event:slug'
        ]);
        Route::get('/my-communities', [CommunityController::class, 'myCommunities'])->name('communities.mine');
    });
});

require __DIR__.'/auth.php';