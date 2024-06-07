<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCart extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'products_cart';
    protected $fillable = [
        'product_id',
        'quantity',
        'cart_id',
    ];
}
