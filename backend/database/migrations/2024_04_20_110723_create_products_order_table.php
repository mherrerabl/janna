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
        Schema::create('products_order', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('price', 2);
            $table->tinyInteger('quantity');
            $table->enum('state',['En preparación', 'Listo para envío', 'Pedido al proveedor']);
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->references('id')->on('orders');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_order');
    }
};
