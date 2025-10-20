<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tareas extends Model
{
    protected $fillable = [
        'titulo',
        'descripcion',
        'estado',
        'prioridad',
        'fecha_vencimiento',
        'responsable'
    ];

    protected $casts = [
        'fecha_vencimiento' => 'date',
    ];

    /**
     * Personalizar la serialización de fechas para JSON/Inertia
     * Asegura que las fechas se devuelvan en formato Y-m-d
     */
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('Y-m-d');
    }

    /**
     * Preparar el modelo para serialización JSON
     * Asegura que fecha_vencimiento siempre sea string
     */
    public function toArray()
    {
        $array = parent::toArray();
        
        if (isset($array['fecha_vencimiento']) && $array['fecha_vencimiento'] !== null) {
            // Asegurar que siempre sea string en formato Y-m-d
            if ($this->fecha_vencimiento instanceof \Carbon\Carbon) {
                $array['fecha_vencimiento'] = $this->fecha_vencimiento->format('Y-m-d');
            }
        }
        
        return $array;
    }
}
