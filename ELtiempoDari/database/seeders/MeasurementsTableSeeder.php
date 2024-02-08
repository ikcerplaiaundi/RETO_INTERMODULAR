<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Measurement;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class MeasurementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      
            Measurement::factory()->create();
            $this->command->info('Se generaron nuevos registros.');
          
      
    }
}
