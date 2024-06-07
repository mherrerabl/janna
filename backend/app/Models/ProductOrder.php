<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOrder extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'products_order';
    protected $fillable = [
        'name',
        'price',
        'quantity',
        'state',
        'order_id'
    ];
}
