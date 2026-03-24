<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController; // Pastikan namespace controller bener

// Public Routes (Bisa diakses tanpa login)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (Harus bawa Token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Contoh rute khusus Admin menggunakan middleware 'role' yang kamu buat tadi
    Route::middleware('role:admin')->get('/admin-dashboard', function() {
        return response()->json(['message' => 'Welcome Admin!']);
    });
});