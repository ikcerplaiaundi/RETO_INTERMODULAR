<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Municipio;
class MunicipioController extends Controller
{
    public function index()
    {
        $municipios = Municipio::all();
        return response()->json($municipios);
    }

    public function create()
    {
        return view('municipios.create');
    }

    public function store(Request $request)
    {
        // Valida y almacena los datos del formulario
        $request->validate([
            'CODIGOINE' => 'required|string',
            'ID_REL' => 'required|string',
            'COD_GEO' => 'required|string',
            'CODPROV' => 'required|string',
            'NOMBRE_PROVINCIA' => 'required|string',
            'NOMBRE' => 'required|string',
            'POBLACION_MUNI' => 'required|integer',
            'SUPERFICIE' => 'required|float',
            'PERIMETRO' => 'required|integer',
            'CODIGOINE_CAPITAL' => 'required|string',
            'NOMBRE_CAPITAL' => 'required|string',
            'POBLACION_CAPITAL' => 'required|integer',
            'HOJA_MTN25' => 'required|string',
            'LONGITUD_ETRS89_REGCAN95' => 'required|float',
            'LATITUD_ETRS89_REGCAN95' => 'required|float',
            'ORIGEN_COORD' => 'required|string',
            'ALTITUD' => 'required|integer',
            'ORIGEN_ALTITUD' => 'required|string',
            'DISCREPANTE_INE' => 'required|integer',
            'humedad_relativa' => 'required|string',
            'orto' => 'required|string',
            'ocaso' => 'required|string',
            'precipitacion' => 'required|integer',
            'temperatura_min' => 'required|integer',
            'temperatura_max' => 'required|integer',
        ]);

        Municipio::create($request->all());

        return redirect()->route('municipios.index')->with('success', 'Municipio creado exitosamente');
    }

    public function show(Municipio $municipio)
    {
        return view('municipios.show', compact('municipio'));
    }

    public function edit(Municipio $municipio)
    {
        return view('municipios.edit', compact('municipio'));
    }

    public function update(Request $request, Municipio $municipio)
    {
        // Valida y actualiza los datos del formulario
        $request->validate([
            'CODIGOINE' => 'required|string',
            'ID_REL' => 'required|string',
            'COD_GEO' => 'required|string',
            'CODPROV' => 'required|string',
            'NOMBRE_PROVINCIA' => 'required|string',
            'NOMBRE' => 'required|string',
            'POBLACION_MUNI' => 'required|integer',
            'SUPERFICIE' => 'required|float',
            'PERIMETRO' => 'required|integer',
            'CODIGOINE_CAPITAL' => 'required|string',
            'NOMBRE_CAPITAL' => 'required|string',
            'POBLACION_CAPITAL' => 'required|integer',
            'HOJA_MTN25' => 'required|string',
            'LONGITUD_ETRS89_REGCAN95' => 'required|float',
            'LATITUD_ETRS89_REGCAN95' => 'required|float',
            'ORIGEN_COORD' => 'required|string',
            'ALTITUD' => 'required|integer',
            'ORIGEN_ALTITUD' => 'required|string',
            'DISCREPANTE_INE' => 'required|integer',
            'humedad_relativa' => 'required|string',
            'orto' => 'required|string',
            'ocaso' => 'required|string',
            'precipitacion' => 'required|integer',
            'temperatura_min' => 'required|integer',
            'temperatura_max' => 'required|integer',
        ]);

        $municipio->update($request->all());

        return redirect()->route('municipios.index')->with('success', 'Municipio actualizado exitosamente');
    }

    public function destroy(Municipio $municipio)
    {
        $municipio->delete();

        return redirect()->route('municipios.index')->with('success', 'Municipio eliminado exitosamente');
    }
}
