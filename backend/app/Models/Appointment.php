<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'appointments';
    protected $fillable = [
        'date',
        'state',
        'user_treatment_id'
    ];
}
