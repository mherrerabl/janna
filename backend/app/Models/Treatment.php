<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'treatments';
    protected $fillable = [
        'name',
        'description',
        'sessions',
        'duration',
        'price_id',
        'category_id'
    ];
}
