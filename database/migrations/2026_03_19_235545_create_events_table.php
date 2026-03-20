<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('community_id')->constrained()->onDelete('cascade'); // Event ini milik komunitas mana
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->dateTime('event_date');
            $table->string('location');
            $table->integer('price')->default(0); // 0 berarti gratis
            $table->integer('capacity');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
