<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'images';
    protected $fillable = [
        'title',
        'picture_jpg',
        'picture_webp',
        'product_id',
        'treatment_id',
        'category_id'
    ];
}
