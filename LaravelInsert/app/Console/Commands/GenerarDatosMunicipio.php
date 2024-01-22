<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Municipio;
use Faker\Factory as Faker;

class GenerarDatosMunicipio extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generar-datos-municipio';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $faker = Faker::create();

        Municipio::all()->each(function ($municipio) use ($faker) {
            $municipio->update([
                'humedad_relativa' => $faker->numberBetween(0, 10),
                'precipitacion' => $faker->numberBetween(0, 100),
                'temperatura_min' => $faker->numberBetween(-10, 10),
                'temperatura_max' => $faker->numberBetween(0, 30),
            ]);
        });
        $this->info('Datos ficticios para la tabla Municipio actualizados con éxito.');
    }
}
