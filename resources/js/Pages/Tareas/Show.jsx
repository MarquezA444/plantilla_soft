import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TareasBadge from '@/Components/Tareas/TareasBadge';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head, Link, router } from '@inertiajs/react';
import { formatDateForDisplay, isDateOverdue } from '@/Utils/dateHelpers';

export default function Show({ auth, tarea }) {
    const formatDate = (dateString) => {
        return formatDateForDisplay(dateString, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isOverdue = isDateOverdue(tarea.fecha_vencimiento) && tarea.estado !== 'completada';

    const handleDelete = () => {
        if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            router.delete(`/tareas/${tarea.id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={tarea.titulo} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/tareas" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                            ← Volver a la lista
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {tarea.titulo}
                                </h1>
                                <div className="flex gap-2">
                                    <Link href={`/tareas/${tarea.id}/edit`}>
                                        <SecondaryButton>
                                            Editar
                                        </SecondaryButton>
                                    </Link>
                                    <DangerButton onClick={handleDelete}>
                                        Eliminar
                                    </DangerButton>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 mb-2">
                                            Estado
                                        </dt>
                                        <dd>
                                            <TareasBadge type="estado" value={tarea.estado} />
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 mb-2">
                                            Prioridad
                                        </dt>
                                        <dd>
                                            <TareasBadge type="prioridad" value={tarea.prioridad} />
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 mb-2">
                                            Fecha de Vencimiento
                                        </dt>
                                        <dd className={`text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                                            {formatDate(tarea.fecha_vencimiento)}
                                            {isOverdue && (
                                                <span className="block text-xs text-red-500 mt-1">
                                                    ⚠️ Esta tarea está vencida
                                                </span>
                                            )}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 mb-2">
                                            Responsable
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                            {tarea.responsable || (
                                                <span className="text-gray-400 italic">Sin asignar</span>
                                            )}
                                        </dd>
                                    </div>

                                    <div className="md:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500 mb-2">
                                            Descripción
                                        </dt>
                                        <dd className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                                            {tarea.descripcion || (
                                                <span className="text-gray-400 italic">Sin descripción</span>
                                            )}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 mb-2">
                                            Creada el
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                            {formatDate(tarea.created_at)}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 mb-2">
                                            Última actualización
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                            {formatDate(tarea.updated_at)}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}