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
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('title', 50);
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('treatment_id')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('product_id')->references('id')->on('products'); 
            $table->foreign('treatment_id')->references('id')->on('treatments'); 
            $table->foreign('category_id')->references('id')->on('categories'); 
        });
        
        DB::statement('ALTER TABLE images ADD picture_jpg LONGBLOB NOT NULL AFTER title');
        DB::statement('ALTER TABLE images ADD picture_webp LONGBLOB NOT NULL AFTER picture_jpg');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
