<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    use HasFactory;
    protected $fillable = [
        'CODIGOINE',
        'ID_REL',
        'COD_GEO',
        'CODPROV',
        'NOMBRE_PROVINCIA',
        'NOMBRE',
        'POBLACION_MUNI',
        'SUPERFICIE',
        'PERIMETRO',
        'CODIGOINE_CAPITAL',
        'NOMBRE_CAPITAL',
        'POBLACION_CAPITAL',
        'HOJA_MTN25',
        'LONGITUD_ETRS89_REGCAN95',
        'LATITUD_ETRS89_REGCAN95',
        'ORIGEN_COORD',
        'ALTITUD',
        'ORIGEN_ALTITUD',
        'DISCREPANTE_INE',
        //variables
        'humedad_relativa',
        'orto',
        'ocaso',
        'precipitacion',
        'temperatura_min',
        'temperatura_max',
        'fecha',
    ];

}
