<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Facade;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
          // Verifica si la tabla ya existe antes de intentar crearla
          if (!Schema::hasTable('measurements')) {
            Schema::create('measurements', function (Blueprint $table) {
                $table->id();
                $table->string('CODIGOINE');
                $table->string('ID_REL');
                $table->string('COD_GEO');
                $table->string('CODPROV');
                $table->string('NOMBRE_PROVINCIA');
                $table->string('NOMBRE');
                $table->integer('POBLACION_MUNI');
                $table->float('SUPERFICIE');
                $table->integer('PERIMETRO');
                $table->string('CODIGOINE_CAPITAL');
                $table->string('NOMBRE_CAPITAL');
                $table->integer('POBLACION_CAPITAL');
                $table->string('HOJA_MTN25');
                $table->float('LONGITUD_ETRS89_REGCAN95');
                $table->float('LATITUD_ETRS89_REGCAN95');
                $table->string('ORIGEN_COORD');
                $table->integer('ALTITUD');
                $table->string('ORIGEN_ALTITUD');
                $table->integer('DISCREPANTE_INE');
    
                // Nuevos campos
                $table->integer('humedad_relativa');
                $table->string('orto');
                $table->string('ocaso');
                $table->integer('precipitacion');
                $table->integer('temperatura_min');
                $table->integer('temperatura_max');
                
                // Atributo de fecha
                $table->dateTime('fecha');//->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //Schema::dropIfExists('measurements');
    }
};
