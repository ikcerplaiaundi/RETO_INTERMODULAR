<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Carbon\Carbon;
use App\Models\Provincia;
use App\Models\Municipio;
use App\Models\Measurement;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class ConsultarApiMediciones extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:consultar-api-mediciones';

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
        $this->consultarApiMedicion();
    }
    private function consultarApiMedicion()
    {
        $municipios = Municipio::all();
        //$client = new Client();
        $municipioconsultado = "";

        try {
            foreach ($municipios as $municipio) {
                $municipioconsultado = ('https://www.el-tiempo.net/api/json/v2/provincias/' . $municipio->CODPROV . "/municipios/" . substr($municipio->CODIGOINE . "", 0, 5));
                $response = Http::get('https://www.el-tiempo.net/api/json/v2/provincias/' . $municipio->CODPROV . "/municipios/" . substr($municipio->CODIGOINE . "", 0, 5));
                $data = json_decode($response->getBody(), true);

                $pronosticoManana = $data['pronostico']['hoy'];

                // Guardar todos los municipios de la provincia en la base de datos

                Measurement::updateOrCreate(
                    [
                        'CODIGOINE' => $municipio['CODIGOINE'],
                        'fecha' =>  Carbon::now('Europe/Madrid')
                    ], // Condiciones de búsqueda
                    [
                        'ID_REL' => $municipio['ID_REL'],
                        'COD_GEO' => $municipio['COD_GEO'],
                        'CODPROV' => $municipio['CODPROV'],
                        'NOMBRE_PROVINCIA' => $municipio['NOMBRE_PROVINCIA'],
                        'NOMBRE' => $municipio['NOMBRE'],
                        'POBLACION_MUNI' => $municipio['POBLACION_MUNI'],
                        'SUPERFICIE' => $municipio['SUPERFICIE'],
                        'PERIMETRO' => $municipio['PERIMETRO'],
                        'CODIGOINE_CAPITAL' => $municipio['CODIGOINE_CAPITAL'],
                        'NOMBRE_CAPITAL' => $municipio['NOMBRE_CAPITAL'],
                        'POBLACION_CAPITAL' => $municipio['POBLACION_CAPITAL'],
                        'HOJA_MTN25' => $municipio['HOJA_MTN25'],
                        'LONGITUD_ETRS89_REGCAN95' => $municipio['LONGITUD_ETRS89_REGCAN95'],
                        'LATITUD_ETRS89_REGCAN95' => $municipio['LATITUD_ETRS89_REGCAN95'],
                        'ORIGEN_COORD' => $municipio['ORIGEN_COORD'],
                        'ALTITUD' => $municipio['ALTITUD'],
                        'ORIGEN_ALTITUD' => $municipio['ORIGEN_ALTITUD'],
                        'DISCREPANTE_INE' => $municipio['DISCREPANTE_INE'],
                        'humedad_relativa' => max($pronosticoManana['humedad_relativa']),
                        'orto' => $pronosticoManana['@attributes']['orto'],
                        'ocaso' => $pronosticoManana['@attributes']['ocaso'],
                        'precipitacion' => max($pronosticoManana['precipitacion']),
                        'temperatura_min' => max($pronosticoManana['temperatura']),
                        'temperatura_max' => min($pronosticoManana['temperatura']),

                        // Agregar otros campos según sea necesario
                    ]
                );
            }
            Log::info('Prediccion de ' . $municipio->NOMBRE . ' guardado en Measurement con éxito.');
            return true;
        } catch (\Exception $e) {
            Log::error('Error al consultar la API de  Measurement o guardar en la base de datos: ' . $municipioconsultado . "   (print de e) :" . $e);
            return false;
        }
    }
}
