<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  ...$roles
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1. Cek apakah user sudah login
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // 2. Ambil role user saat ini
        $userRole = $request->user()->role;

        // 3. Cek apakah role user ada di dalam daftar role yang diizinkan
        // Contoh: middleware('role:admin,organizer')
        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        // 4. JIKA TIDAK PUNYA AKSES:
        // Bukannya di-abort, kita arahkan ke dashboard yang sesuai rolenya
        if ($userRole === 'admin') {
            return redirect()->route('admin.dashboard')->with('error', 'Anda dialihkan ke dashboard admin.');
        }

        return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki akses ke halaman tersebut.');
    }
}