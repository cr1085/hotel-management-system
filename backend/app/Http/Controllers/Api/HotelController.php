<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHotelRequest;
use App\Models\Hotel;

class HotelController extends Controller
{
    // public function index()
    // {
    //     return response()->json(
    //         Hotel::all()
    //     );
    // }

    public function index()
{
    $hotels = Hotel::with([
        'rooms.roomType',
        'rooms.accommodation'
    ])->get();

    return response()->json($hotels);
}

    public function store(StoreHotelRequest $request)
    {
        $hotel = Hotel::create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Hotel creado correctamente',
            'data' => $hotel
        ], 201);
    }

    public function show(Hotel $hotel)
    {
        return response()->json($hotel);
    }
}
