<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Provincia;

class ProvinciaController extends Controller
{
    public function index()
    {
        $provincias = Provincia::all();
        return view('provincias.index', compact('provincias'));
    }

    public function create()
    {
        return view('provincias.create');
    }

    public function store(Request $request)
    {
        // Valida y almacena los datos del formulario
        $request->validate([
            'CODPROV' => 'required|string',
            'NOMBRE_PROVINCIA' => 'required|string',
            'CODAUTON' => 'required|string',
            'COMUNIDAD_CIUDAD_AUTONOMA' => 'required|string',
            'CAPITAL_PROVINCIA' => 'required|string',
        ]);

        Provincia::create($request->all());

        return redirect()->route('provincias.index')->with('success', 'Provincia creada exitosamente');
    }

    public function show(Provincia $provincia)
    {
        return view('provincias.show', compact('provincia'));
    }

    public function edit(Provincia $provincia)
    {
        return view('provincias.edit', compact('provincia'));
    }

    public function update(Request $request, Provincia $provincia)
    {
        // Valida y actualiza los datos del formulario
        $request->validate([
            'CODPROV' => 'required|string',
            'NOMBRE_PROVINCIA' => 'required|string',
            'CODAUTON' => 'required|string',
            'COMUNIDAD_CIUDAD_AUTONOMA' => 'required|string',
            'CAPITAL_PROVINCIA' => 'required|string',
        ]);

        $provincia->update($request->all());

        return redirect()->route('provincias.index')->with('success', 'Provincia actualizada exitosamente');
    }

    public function destroy(Provincia $provincia)
    {
        $provincia->delete();

        return redirect()->route('provincias.index')->with('success', 'Provincia eliminada exitosamente');
    }
}
