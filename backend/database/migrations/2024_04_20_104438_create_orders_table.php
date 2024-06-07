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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->float('total_price');
            $table->unsignedBigInteger('address_id')->nullable();
            $table->enum('state', ['Pendiente de pago','Pago realizado', 'En preparación', 'Pendiente de envío', 'Enviado', 'Pendiente de recoger en tienda', 'Entregado']);
            $table->string('session_id')->unique();
            $table->date('creation_date');
            $table->date('modification_date');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('address_id')->references('id')->on('addresses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
