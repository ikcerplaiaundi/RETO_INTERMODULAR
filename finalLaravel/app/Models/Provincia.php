<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    use HasFactory;
    protected $fillable = ['CODPROV', 'NOMBRE_PROVINCIA', 'CODAUTON', 'COMUNIDAD_CIUDAD_AUTONOMA', 'CAPITAL_PROVINCIA'];

    public function municipios()
    {
        return $this->hasMany(Municipio::class, 'CODPROV', 'CODPROV');
    }
}
