<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Measurement;

class MeasurementController extends Controller
{
    public function filter(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'NOMBRE' => 'required|string',
            'fecha' => 'required|date',
        ]);

        // Obtener las mediciones filtradas
        $measurements = Measurement::where('NOMBRE', $request->input('NOMBRE'))
            ->whereDate('fecha', $request->input('fecha'))
            ->get();

        // Puedes devolver las mediciones filtradas a una vista o realizar otra acción según tus necesidades
        return view('measurements.filtered', compact('measurements'));
    }
    public function index()
    {
        $measurements = Measurement::all();
        return view('measurements.index', compact('measurements'));
    }

    public function create()
    {
        return view('measurements.create');
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
            'humedad_relativa' => 'required|integer',
            'orto' => 'required|string',
            'ocaso' => 'required|string',
            'precipitacion' => 'required|integer',
            'temperatura_min' => 'required|integer',
            'temperatura_max' => 'required|integer',
            'fecha' => 'required|date',
        ]);

        Measurement::create($request->all());

        return redirect()->route('measurements.index')->with('success', 'Medición creada exitosamente');
    }

    public function show(Measurement $measurement)
    {
        return view('measurements.show', compact('measurement'));
    }

    public function edit(Measurement $measurement)
    {
        return view('measurements.edit', compact('measurement'));
    }

    public function update(Request $request, Measurement $measurement)
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
            'humedad_relativa' => 'required|integer',
            'orto' => 'required|string',
            'ocaso' => 'required|string',
            'precipitacion' => 'required|integer',
            'temperatura_min' => 'required|integer',
            'temperatura_max' => 'required|integer',
            'fecha' => 'required|date',
        ]);

        $measurement->update($request->all());

        return redirect()->route('measurements.index')->with('success', 'Medición actualizada exitosamente');
    }

    public function destroy(Measurement $measurement)
    {
        $measurement->delete();

        return redirect()->route('measurements.index')->with('success', 'Medición eliminada exitosamente');
    }
}
