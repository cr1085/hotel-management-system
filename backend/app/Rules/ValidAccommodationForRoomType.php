<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class ValidAccommodationForRoomType implements ValidationRule
{
    private string $roomType;

    private const RULES = [
        'ESTANDAR' => ['SENCILLA', 'DOBLE'],
        'JUNIOR' => ['TRIPLE', 'CUADRUPLE'],
        'SUITE' => ['SENCILLA', 'DOBLE', 'TRIPLE'],
    ];

    public function __construct(string $roomType)
    {
        $this->roomType = $roomType;
    }

    /**
     * Run the validation rule.
     *
     * @param Closure(string, ?string=): PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $allowedAccommodations = self::RULES[$this->roomType] ?? [];

        if (!in_array($value, $allowedAccommodations)) {
            $fail("La acomodación no es válida para el tipo de habitación {$this->roomType}");
        }
    }
}
