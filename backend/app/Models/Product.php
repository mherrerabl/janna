<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'products';
    protected $fillable = [
        'name',
        'brand',
        'category_id',
        'description',
        'routine',
        'use',
        'benefits',
        'saleperson_id',
        'stock',
        'price_id',
        'purchasePrice',
        'trend',
        'forSale',
        'treatment_id',
        'creation_date'
    ];
}
