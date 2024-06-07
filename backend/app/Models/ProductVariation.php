<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'products_variation';
    protected $fillable = [
        'name',
        'stock',
        'price_id',
        'purchasePrice',
        'color',
        'product_id',
        'product_variation_id',
        'creation_date',
    ];
}
