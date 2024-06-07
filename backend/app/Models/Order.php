<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'orders';
    protected $fillable = [
        'user_id',
        'total_price',
        'address_id',
        'state',
        'session_id',
        'creation_date',
        'modification_date'
    ];
}
