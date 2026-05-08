<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHotelRoomRequest;
use App\Models\Accommodation;
use App\Models\Hotel;
use App\Models\HotelRoom;
use App\Models\RoomType;

class HotelRoomController extends Controller
{
    public function store(
        StoreHotelRoomRequest $request,
        Hotel $hotel
    )
    {
        $roomType = RoomType::where(
            'name',
            $request->room_type
        )->first();

        $accommodation = Accommodation::where(
            'name',
            $request->accommodation
        )->first();

        $currentRooms = $hotel->rooms()->sum('quantity');

        $newTotal = $currentRooms + $request->quantity;

        if ($newTotal > $hotel->total_rooms) {
            return response()->json([
                'message' => 'La cantidad excede el máximo de habitaciones del hotel'
            ], 422);
        }

        $exists = HotelRoom::where([
            'hotel_id' => $hotel->id,
            'room_type_id' => $roomType->id,
            'accommodation_id' => $accommodation->id,
        ])->exists();

        if ($exists) {
            return response()->json([
                'message' => 'La configuración ya existe para este hotel'
            ], 422);
        }

        $hotelRoom = HotelRoom::create([
            'hotel_id' => $hotel->id,
            'room_type_id' => $roomType->id,
            'accommodation_id' => $accommodation->id,
            'quantity' => $request->quantity,
        ]);

        return response()->json([
            'message' => 'Habitación configurada correctamente',
            'data' => $hotelRoom
        ], 201);
    }
}
