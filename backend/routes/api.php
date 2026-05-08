<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\HotelRoomController;

Route::apiResource('hotels', HotelController::class);

Route::post(
    'hotels/{hotel}/rooms',
    [HotelRoomController::class, 'store']
);
