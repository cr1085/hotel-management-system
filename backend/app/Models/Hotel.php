<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hotel extends Model
{

protected $fillable = [
    'name',
    'address',
    'city',
    'nit',
    'total_rooms',
];

public function rooms(): HasMany
{
    return $this->hasMany(HotelRoom::class);
}
    //
}
