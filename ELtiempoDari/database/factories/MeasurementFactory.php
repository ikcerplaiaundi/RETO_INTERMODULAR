<?php

namespace Database\Factories;

use App\Models\Measurement;
use App\Models\Municipio;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;
class MeasurementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {   
        // Obtener la fecha límite y la fecha actual
        $fechaLimite = Carbon::parse('2024-01-01');
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
                $measurementData[] = [
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
                    'humedad_relativa' => $this->faker->randomNumber(),
                    'orto' => $this->faker->word,
                    'ocaso' => $this->faker->word,
                    'precipitacion' => $this->faker->randomNumber(),
                    'temperatura_min' => $this->faker->randomNumber(),
                    'temperatura_max' => $this->faker->randomNumber(),
                    // La fecha actual en formato de fecha y hora
                    'fecha' => $fecha->toDateTimeString(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            // Avanzar al siguiente día
            $fecha->addMinutes(15);
        }

        return $measurementData;
    }
}