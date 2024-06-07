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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('brand', 50);
            $table->unsignedBigInteger('category_id');
            $table->text('description');
            $table->enum('routine', ['Desmaquillante', 'Limpiador', 'Exfoliante', 'Tónico', 'Mascarilla', 'Esencia', 'Sérum', 'Contorno de ojos', 'Hidratante', 'Protector solar']);
            $table->text('use');
            $table->text('benefits');
            $table->unsignedBigInteger('saleperson_id');
            $table->integer('stock')->default(0);
            $table->unsignedBigInteger('price_id');
            $table->float('purchasePrice', 2);
            $table->boolean('trend');
            $table->boolean('forSale');
            $table->unsignedBigInteger('treatment_id')->nullable();
            $table->date('creation_date');
            $table->foreign('category_id')->references('id')->on('categories'); 
            $table->foreign('saleperson_id')->references('id')->on('salepersons');
            $table->foreign('price_id')->references('id')->on('prices');       
            $table->foreign('treatment_id')->references('id')->on('treatments');     
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
