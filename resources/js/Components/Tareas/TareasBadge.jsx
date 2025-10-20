export default function TareasBadge({ type, value }) {
    const getStyles = () => {
        if (type === 'estado') {
            const estadoStyles = {
                'pendiente': 'bg-yellow-100 text-yellow-800',
                'en_progreso': 'bg-blue-100 text-blue-800',
                'completada': 'bg-green-100 text-green-800'
            };
            return estadoStyles[value] || 'bg-gray-100 text-gray-800';
        }
        
        if (type === 'prioridad') {
            const prioridadStyles = {
                'baja': 'bg-gray-100 text-gray-800',
                'media': 'bg-orange-100 text-orange-800',
                'alta': 'bg-red-100 text-red-800'
            };
            return prioridadStyles[value] || 'bg-gray-100 text-gray-800';
        }
        
        return 'bg-gray-100 text-gray-800';
    };
    
    const getLabel = () => {
        if (type === 'estado') {
            const labels = {
                'pendiente': 'Pendiente',
                'en_progreso': 'En Progreso',
                'completada': 'Completada'
            };
            return labels[value] || value;
        }
        
        if (type === 'prioridad') {
            const labels = {
                'baja': 'Baja',
                'media': 'Media',
                'alta': 'Alta'
            };
            return labels[value] || value;
        }
        
        return value;
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStyles()}`}>
            {getLabel()}
        </span>
    );
}