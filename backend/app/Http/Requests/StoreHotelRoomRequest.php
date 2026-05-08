<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\ValidAccommodationForRoomType;

class StoreHotelRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'room_type' => 'required|string',

            'accommodation' => [
                'required',
                'string',
                new ValidAccommodationForRoomType(
                    $this->room_type
                ),
            ],

            'quantity' => 'required|integer|min:1',
        ];
    }
}
