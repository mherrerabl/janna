<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTreatment extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'user_treatments';
    protected $fillable = [
        'user_id',
        'state',
        'sessions',
        'treatment_id',
    ];
}
