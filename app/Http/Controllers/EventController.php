<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        // Ambil semua data event dari database
        $events = Event::with('community')->get();

        // Kirim data ke halaman React (Halaman 'Events/Index')
        return Inertia::render('Events/Index', [
            'events' => $events
        ]);
    }

    public function show(Event $event)
    {
        // Load relasi komunitasnya juga
        $event->load('community');

        return Inertia::render('Events/Show', [
            'event' => $event
        ]);
    }

    public function join(Event $event)
    {
        $user = auth()->user();

        // Cek dulu, biar nggak daftar dua kali di event yang sama
        if ($user->registeredEvents()->where('event_id', $event->id)->exists()) {
            return back()->with('message', 'Lu udah terdaftar di event ini, Bro!');
        }

        // Daftarin!
        $user->registeredEvents()->attach($event->id);

        return back()->with('message', 'Berhasil daftar! Sampai ketemu di lokasi!');
    }
}