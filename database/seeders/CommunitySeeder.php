<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Community;
use App\Models\Event;
use Illuminate\Support\Str;

class CommunitySeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ambil user pertama yang lu buat tadi pas register
        $user = User::first();

        if (!$user) {
            $this->command->info('Eits! Lu harus Register dulu di web biar ada User-nya, Bro!');
            return;
        }

        // 2. Buat Komunitas Contoh
        $community = Community::create([
            'user_id' => $user->id,
            'name' => 'Komunitas Informatika Indonesia',
            'slug' => 'komunitas-informatika-indonesia',
            'description' => 'Wadah kumpul mahasiswa TI buat belajar Laravel & React.',
        ]);

        // 3. Buat 3 Event Contoh sekaligus
        $events = [
            [
                'title' => 'Workshop Laravel & Inertia',
                'description' => 'Belajar bikin web modern tanpa pusing koding API terpisah.',
                'location' => 'Gedung Lab Komputer Lt. 3',
                'price' => 0,
                'capacity' => 50,
            ],
            [
                'title' => 'Seminar AI di Era 2026',
                'description' => 'Membahas masa depan engineer di tengah gempuran AI.',
                'location' => 'Aula Utama Kampus',
                'price' => 50000,
                'capacity' => 200,
            ],
            [
                'title' => 'Hackathon Internal Komunitas',
                'description' => 'Lomba koding 24 jam non-stop buat asah logika.',
                'location' => 'Discord Server',
                'price' => 25000,
                'capacity' => 100,
            ],
        ];

        foreach ($events as $item) {
            Event::create([
                'community_id' => $community->id,
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'description' => $item['description'],
                'event_date' => now()->addDays(rand(1, 30)),
                'location' => $item['location'],
                'price' => $item['price'],
                'capacity' => $item['capacity'],
            ]);
        }

        $this->command->info('Mantap! 1 Komunitas dan 3 Event berhasil dibuat.');
    }
}