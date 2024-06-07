<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saleperson extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'salepersons';
    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone'
    ];
}
