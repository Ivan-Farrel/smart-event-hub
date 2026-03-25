<?php

namespace App\Http\Controllers;

use App\Models\Community; // WAJIB ADA: Biar sistem kenal tabel Community
use Illuminate\Http\Request;
use Illuminate\Support\Str; // Tambahin ini buat fungsi slug
use Inertia\Inertia;

class CommunityController extends Controller
{
    /**
     * Menampilkan daftar komunitas (Hanya yang sudah Approved)
     */
    public function index()
    {
        // Hanya ambil komunitas yang statusnya 'approved'
        $communities = Community::where('status', 'approved')
            ->withCount('users') // Nanti buat nampilin jumlah member
            ->latest()
            ->get();

        return Inertia::render('Communities/Index', [
            'communities' => $communities
        ]);
    }

    /**
     * Menampilkan Form Buat Komunitas
     */
    public function create()
    {
        return Inertia::render('Communities/Create');
    }

    /**
     * Menyimpan data komunitas baru (Status: Pending)
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:communities',
            'description' => 'required',
            'join_type' => 'required|in:auto,manual',
            'image' => 'nullable|image|max:2048',
        ]);

        $path = $request->file('image') ? $request->file('image')->store('communities', 'public') : null;

        Community::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . Str::random(5), // Kasih random dikit biar slug makin unik
            'description' => $request->description,
            'join_type' => $request->join_type,
            'image' => $path,
            'status' => 'pending', 
        ]);

        // Redirect ke dashboard dengan flash message
        return redirect()->route('dashboard')->with('message', 'Pengajuan komunitas berhasil dikirim!');
    }

    /**
     * Menampilkan Detail Komunitas
     */
    public function show(Community $community)
    {
        return Inertia::render('Communities/Show', [
            'community' => $community
        ]);
    }

    // Menampilkan daftar komunitas yang butuh approval (Khusus Admin)
    public function pendingApprovals()
    {
        $pendingCommunities = Community::where('status', 'pending')->with('creator')->latest()->get();

        return Inertia::render('Admin/Approvals', [
            'communities' => $pendingCommunities
        ]);
    }

    // Proses Approve
    public function approve(Community $community)
    {
        $community->update(['status' => 'approved']);

        return redirect()->back()->with('message', "Komunitas {$community->name} berhasil disetujui!");
    }

    
}