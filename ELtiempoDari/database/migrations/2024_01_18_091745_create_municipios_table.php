<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('municipios', function (Blueprint $table) {
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
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('municipios');
    }
};
