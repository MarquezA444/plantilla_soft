import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';

export default function TareasFilters({ filters = {}, onChange }) {
    const [localFilters, setLocalFilters] = useState({
        search: filters.search || '',
        estado: filters.estado || [],
        prioridad: filters.prioridad || []
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(localFilters);
        }, 300);

        return () => clearTimeout(timer);
    }, [localFilters]);

    const handleSearchChange = (value) => {
        setLocalFilters(prev => ({ ...prev, search: value }));
    };

    const handleCheckboxChange = (type, value) => {
        setLocalFilters(prev => {
            const currentValues = prev[type] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [type]: newValues };
        });
    };

    const handleClearFilters = () => {
        const clearedFilters = { search: '', estado: [], prioridad: [] };
        setLocalFilters(clearedFilters);
        onChange(clearedFilters);
    };

    const hasActiveFilters = localFilters.search || 
        localFilters.estado?.length > 0 || 
        localFilters.prioridad?.length > 0;

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                    <InputLabel htmlFor="search" value="Buscar tareas" />
                    <TextInput
                        id="search"
                        type="text"
                        placeholder="Buscar por título o descripción..."
                        value={localFilters.search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="mt-1 block w-full"
                    />
                </div>

                <div>
                    <InputLabel value="Estado" className="mb-2" />
                    <div className="space-y-2">
                        {['pendiente', 'en_progreso', 'completada'].map((estado) => (
                            <label key={estado} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={localFilters.estado?.includes(estado) || false}
                                    onChange={() => handleCheckboxChange('estado', estado)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 capitalize">
                                    {estado === 'en_progreso' ? 'En Progreso' : estado}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <InputLabel value="Prioridad" className="mb-2" />
                    <div className="space-y-2">
                        {['baja', 'media', 'alta'].map((prioridad) => (
                            <label key={prioridad} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={localFilters.prioridad?.includes(prioridad) || false}
                                    onChange={() => handleCheckboxChange('prioridad', prioridad)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 capitalize">
                                    {prioridad}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex items-end">
                    {hasActiveFilters && (
                        <SecondaryButton onClick={handleClearFilters}>
                            Limpiar Filtros
                        </SecondaryButton>
                    )}
                </div>
            </div>
        </div>
    );
}