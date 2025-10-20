import TareasBadge from './TareasBadge';
import { Link } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { formatDateForDisplay, isDateOverdue } from '@/Utils/dateHelpers';

export default function TareasItem({ tarea, onDelete }) {
    const truncateText = (text, maxLength = 60) => {
        if (!text) return 'Sin descripción';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const isOverdue = isDateOverdue(tarea.fecha_vencimiento) && tarea.estado !== 'completada';

    return (
        <tr className="border-b hover:bg-gray-50 transition-colors">

            <td className="px-6 py-4">
                <div className="font-medium text-gray-900">
                    {tarea.titulo}
                </div>
            </td>

            <td className="px-6 py-4 text-sm text-gray-600">
                {truncateText(tarea.descripcion)}
            </td>

            <td className="px-6 py-4">
                <TareasBadge type="estado" value={tarea.estado} />
            </td>

            <td className="px-6 py-4">
                <TareasBadge type="prioridad" value={tarea.prioridad} />
            </td>

            <td className={`px-6 py-4 text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                {formatDateForDisplay(tarea.fecha_vencimiento)}
                {isOverdue && (
                    <span className="block text-xs text-red-500">¡Vencida!</span>
                )}
            </td>

            <td className="px-6 py-4 text-sm text-gray-600">
                {tarea.responsable || <span className="text-gray-400 italic">Sin asignar</span>}
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <Link href={`/tareas/${tarea.id}`}>
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                            Ver
                        </button>
                    </Link>
                    
                    <Link href={`/tareas/${tarea.id}/edit`}>
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                            Editar
                        </button>
                    </Link>
                    
                    <button
                        onClick={() => onDelete(tarea.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
}