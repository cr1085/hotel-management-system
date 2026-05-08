<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Accommodation;

class AccommodationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Accommodation::insert([
   ['name' => 'SENCILLA'],
   ['name' => 'DOBLE'],
   ['name' => 'TRIPLE'],
   ['name' => 'CUADRUPLE'],
]);
    }
}
