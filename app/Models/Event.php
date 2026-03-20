<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    // Pastiin baris ini ada, Bro!
    protected $fillable = [
        'community_id', 'title', 'slug', 'description', 'event_date', 'location', 'price', 'capacity', 'image'
    ];

    /**
     * Relasi ke Komunitas (Satu Event milik satu Komunitas)
     */
    public function community() // <--- Nama fungsi ini yang dipanggil di Controller
    {
        return $this->belongsTo(Community::class);
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_registrations');
    }
}