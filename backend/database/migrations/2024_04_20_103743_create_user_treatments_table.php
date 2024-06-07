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
        Schema::create('user_treatments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->enum('state', ['En proceso', 'Finalizado', 'No realizado']);
            $table->tinyInteger('sessions');
            $table->unsignedBigInteger('treatment_id');
            $table->foreign('user_id')->references('id')->on('users'); 
            $table->foreign('treatment_id')->references('id')->on('treatments'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_treatments');
    }
};
