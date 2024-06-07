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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->datetime('date');
            $table->enum('state', ['Pendiente', 'Próxima sesión', 'Realizada', 'No realizada', 'Cancelada']); 
            $table->unsignedBigInteger('user_treatment_id');
            $table->foreign('user_treatment_id')->references('id')->on('user_treatments'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
