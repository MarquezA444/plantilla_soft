import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TareasForm from '@/Components/Tareas/TareasForm';
import { Head } from '@inertiajs/react';
import { formatDateForInput } from '@/Utils/dateHelpers';

export default function Edit({ auth, tarea }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Editar Tarea" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                Editar Tarea
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {tarea.titulo}
                            </p>

                            <TareasForm
                                initialData={{
                                    titulo: tarea.titulo,
                                    descripcion: tarea.descripcion || '',
                                    estado: tarea.estado,
                                    prioridad: tarea.prioridad,
                                    fecha_vencimiento: formatDateForInput(tarea.fecha_vencimiento),
                                    responsable: tarea.responsable || ''
                                }}
                                submitUrl={`/tareas/${tarea.id}`}
                                submitMethod="put"
                                buttonText="Actualizar Tarea"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}