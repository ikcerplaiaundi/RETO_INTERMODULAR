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

class ConsultarApiExterna extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:consultar-api-externa';

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
        if ($this->consultarApiProvincias()) {
            if ($this->consultarApiMunicipios()) {
                $this->consultarApiPrediccion();
            }
        }
    }

    private function consultarApiProvincias()
    {
        //$client = new Client();

        try {
            $response = Http::get('https://www.el-tiempo.net/api/json/v2/provincias');
            $data = json_decode($response->getBody(), true);

            // Guardar todas las provincias en la base de datos
            foreach ($data['provincias'] as $provinciaData) {
                if ($provinciaData['COMUNIDAD_CIUDAD_AUTONOMA'] == "País Vasco/Euskadi") {
                    Provincia::updateOrCreate(
                        ['CODPROV' => $provinciaData['CODPROV']],
                        [
                            'NOMBRE_PROVINCIA' => $provinciaData['NOMBRE_PROVINCIA'],
                            'CODAUTON' => $provinciaData['CODAUTON'],
                            'COMUNIDAD_CIUDAD_AUTONOMA' => $provinciaData['COMUNIDAD_CIUDAD_AUTONOMA'],
                            'CAPITAL_PROVINCIA' => $provinciaData['CAPITAL_PROVINCIA'],

                        ]
                    );
                }
            }

            Log::info('Provincia guardada en la base de datos con éxito.');
            return true;
        } catch (\Exception $e) {
            Log::error('Error al consultar la API de provincias o guardar en la base de datos: ' . $e->getMessage());
            return false;
        }
    }
    private function consultarApiMunicipios()
    {
        $provincias = Provincia::all();

        foreach ($provincias as $provincia) {
            $this->consultarMunicipiosPorProvincia($provincia);
        }
    }
    private function consultarMunicipiosPorProvincia($provincia)
    {


        try {

            $response = Http::get('https://www.el-tiempo.net/api/json/v2/provincias/' . $provincia->CODPROV . '/municipios');
            $data = json_decode($response->getBody(), true);

            // Guardar todos los municipios de la provincia en la base de datos
            foreach ($data['municipios'] as $municipioData) {

                Municipio::updateOrCreate(
                    ['CODIGOINE' => $municipioData['CODIGOINE']],
                    [
                        /*'CODIGOINE','ID_REL','COD_GEO','CODPROV','NOMBRE_PROVINCIA','NOMBRE','POBLACION_MUNI','SUPERFICIE','PERIMETRO','CODIGOINE_CAPITAL','NOMBRE_CAPITAL','POBLACION_CAPITAL','HOJA_MTN25','LONGITUD_ETRS89_REGCAN95',
        'LATITUD_ETRS89_REGCAN95',
        'ORIGEN_COORD',
        'ALTITUD',
        'ORIGEN_ALTITUD',
        'DISCREPANTE_INE',*/
                        'ID_REL' => $municipioData['ID_REL'],
                        'COD_GEO' => $municipioData['COD_GEO'],
                        'CODPROV' => $municipioData['CODPROV'],
                        'NOMBRE_PROVINCIA' => $municipioData['NOMBRE_PROVINCIA'],
                        'NOMBRE' => $municipioData['NOMBRE'],
                        'POBLACION_MUNI' => $municipioData['POBLACION_MUNI'],
                        'SUPERFICIE' => $municipioData['SUPERFICIE'],
                        'PERIMETRO' => $municipioData['PERIMETRO'],
                        'CODIGOINE_CAPITAL' => $municipioData['CODIGOINE_CAPITAL'],
                        'NOMBRE_CAPITAL' => $municipioData['NOMBRE_CAPITAL'],
                        'POBLACION_CAPITAL' => $municipioData['POBLACION_CAPITAL'],
                        'HOJA_MTN25' => $municipioData['HOJA_MTN25'],
                        'LONGITUD_ETRS89_REGCAN95' => $municipioData['LONGITUD_ETRS89_REGCAN95'],
                        'LATITUD_ETRS89_REGCAN95' => $municipioData['LATITUD_ETRS89_REGCAN95'],
                        'ORIGEN_COORD' => $municipioData['ORIGEN_COORD'],
                        'ALTITUD' => $municipioData['ALTITUD'],
                        'ORIGEN_ALTITUD' => $municipioData['ORIGEN_ALTITUD'],
                        'DISCREPANTE_INE' => $municipioData['DISCREPANTE_INE'],
                        'humedad_relativa' => 0,
                        'orto' => "08:35",
                        'ocaso' => "18:07",
                        'precipitacion' => 0,
                        'temperatura_min' => 0,
                        'temperatura_max' => 0,

                        // Agregar otros campos según sea necesario
                    ]
                );
            }

            Log::info('Municipios de ' . $provincia->NOMBRE_PROVINCIA . ' guardados en la base de datos con éxito.');
            return true;
        } catch (\Exception $e) {
            Log::error('Error al consultar la API de municipios o guardar en la base de datos: ' . $e->getMessage());
            return false;
        }
    }

    private function consultarApiPrediccion()
    {
        $municipios = Municipio::all();
        //$client = new Client();
        foreach ($municipios as $municipio) {
            try {
                $response = Http::get('https://www.el-tiempo.net/api/json/v2/provincias/' . $municipio->CODPROV . '/municipio' . substr($municipio->ID_REL, 0, 5));
                $data = json_decode($response->getBody(), true);

                $pronosticoManana = $data['pronostico']['manana'];
                // Guardar todos los municipios de la provincia en la base de datos

                $municipio->update([
                    'humedad_relativa' => max($pronosticoManana['humedad_relativa']),
                    'orto' => $pronosticoManana['@attributes']['orto'],
                    'ocaso' => $pronosticoManana['@attributes']['ocaso'],
                    'precipitacion' => max($pronosticoManana['precipitacion']),
                    'temperatura_min' => max($pronosticoManana['temperatura']),
                    'temperatura_max' => min($pronosticoManana['temperatura']),
                ]);


                Log::info('Prediccion de ' . $municipio->NOMBRE . ' guardado en la base de datos con éxito.');
                return true;
            } catch (\Exception $e) {
                Log::error('Error al consultar la API de  Prediccion municipios o guardar en la base de datos: ' . $e->getMessage());
                return false;
            }
        }
    }


}
