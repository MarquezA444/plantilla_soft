<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\tareas;
use Illuminate\Http\Request;

class TareasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = tareas::query();

        // Búsqueda por título o descripción
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('titulo', 'like', "%{$search}%")
                  ->orWhere('descripcion', 'like', "%{$search}%");
            });
        }

        // Filtro por estado
        if ($request->filled('estado') && is_array($request->estado) && count($request->estado) > 0) {
            $query->whereIn('estado', $request->estado);
        }

        // Filtro por prioridad
        if ($request->filled('prioridad') && is_array($request->prioridad) && count($request->prioridad) > 0) {
            $query->whereIn('prioridad', $request->prioridad);
        }

        // Ordenar por fecha de vencimiento (las más próximas primero)
        $tareas = $query->orderByRaw('fecha_vencimiento IS NULL')
                        ->orderBy('fecha_vencimiento', 'asc')
                        ->orderBy('created_at', 'desc')
                        ->paginate(15)
                        ->withQueryString();

        return Inertia::render('Tareas/Index', [
            'tareas' => $tareas,
            'filters' => $request->only(['search', 'estado', 'prioridad'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tareas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'required|in:pendiente,en_progreso,completada',
            'prioridad' => 'required|in:baja,media,alta',
            'fecha_vencimiento' => 'nullable|date',
            'responsable' => 'nullable|string|max:255'
        ]);

        tareas::create($validated);

        return redirect()->route('tareas.index')
            ->with('success', 'Tarea creada correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(tareas $tarea)
    {
        return Inertia::render('Tareas/Show', [
            'tarea' => $tarea
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(tareas $tarea)
    {
        return Inertia::render('Tareas/Edit', [
            'tarea' => $tarea
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, tareas $tarea)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'required|in:pendiente,en_progreso,completada',
            'prioridad' => 'required|in:baja,media,alta',
            'fecha_vencimiento' => 'nullable|date',
            'responsable' => 'nullable|string|max:255'
        ]);

        $tarea->update($validated);

        return redirect()->route('tareas.index')
            ->with('success', 'Tarea actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(tareas $tarea)
    {
        $tarea->delete();

        return redirect()->route('tareas.index')
            ->with('success', 'Tarea eliminada correctamente');
    }
}
