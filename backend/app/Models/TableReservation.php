<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableReservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'guests',
        'date',
        'time',
        'special_requests',
        'status'
    ];

    protected $casts = [
        'date' => 'date',
        'time' => 'datetime',
        'guests' => 'integer'
    ];
}
