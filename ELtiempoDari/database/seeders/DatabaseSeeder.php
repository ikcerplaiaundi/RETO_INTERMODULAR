<?php

namespace Database\Seeders;

use App\Models\Measurement;
use App\Models\Municipio;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        
        // Obtener la fecha límite y la fecha actual
        $fechaLimite = Carbon::parse('2023-01-20');
        $fechaActual = now();

        // Arreglo para almacenar los datos de los municipios
        $measurementData = [];

        // Iterar sobre cada día entre la fecha límite y la fecha actual
        $fecha = clone $fechaLimite;
        while ($fecha->lessThanOrEqualTo($fechaActual)) {
            // Obtener todos los municipios
            $municipios = Municipio::all();

            // Iterar sobre cada municipio y crear un registro de Measurement
            foreach ($municipios as $municipio) {
                $faker = Faker::create();
                Measurement::create([
                    'CODIGOINE' => $municipio->CODIGOINE,
                    'ID_REL' => $municipio->ID_REL,
                    'COD_GEO' => $municipio->COD_GEO,
                    'CODPROV' => $municipio->CODPROV,
                    'NOMBRE_PROVINCIA' => $municipio->NOMBRE_PROVINCIA,
                    'NOMBRE' => $municipio->NOMBRE,
                    'POBLACION_MUNI' => $municipio->POBLACION_MUNI,
                    'SUPERFICIE' => $municipio->SUPERFICIE,
                    'PERIMETRO' => $municipio->PERIMETRO,
                    'CODIGOINE_CAPITAL' => $municipio->CODIGOINE_CAPITAL,
                    'NOMBRE_CAPITAL' => $municipio->NOMBRE_CAPITAL,
                    'POBLACION_CAPITAL' => $municipio->POBLACION_CAPITAL,
                    'HOJA_MTN25' => $municipio->HOJA_MTN25,
                    'LONGITUD_ETRS89_REGCAN95' => $municipio->LONGITUD_ETRS89_REGCAN95,
                    'LATITUD_ETRS89_REGCAN95' => $municipio->LATITUD_ETRS89_REGCAN95,
                    'ORIGEN_COORD' => $municipio->ORIGEN_COORD,
                    'ALTITUD' => $municipio->ALTITUD,
                    'ORIGEN_ALTITUD' => $municipio->ORIGEN_ALTITUD,
                    'DISCREPANTE_INE' => $municipio->DISCREPANTE_INE,
                    // Otros campos de Measurement
                    'humedad_relativa' => $faker->numberBetween(0, 10),
                    'orto' => "08:24",
                    'ocaso' => "18:24",
                    'precipitacion' => $faker->numberBetween(0, 100),
                    'temperatura_min' => $faker->numberBetween(-10, 10),
                    'temperatura_max' => $faker->numberBetween(0, 30),
                    // La fecha actual en formato de fecha y hora
                    'fecha' => $fecha->toDateTimeString(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                
                Log::info( "measurement inserta :   ".$municipio->NOMBRE.", fecha :  ".$fecha->toDateTimeString());
            }

            // Avanzar al siguiente día
            $fecha->addMinutes(15);
        }

        return $measurementData;
    }
}
