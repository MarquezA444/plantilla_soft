import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TareasList from '@/Components/Tareas/TareasList';
import TareasFilters from '@/Components/Tareas/TareasFilters';
import TareasPagination from '@/Components/Tareas/TareasPagination';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, tareas = { data: [], links: [] }, filters = {} }) {
    const handleFilterChange = (newFilters) => {
        router.get('/tareas', newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            router.delete(`/tareas/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tareas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Mis Tareas
                        </h2>
                        <Link href="/tareas/create">
                            <PrimaryButton>
                                + Nueva Tarea
                            </PrimaryButton>
                        </Link>
                    </div>

                    <TareasFilters 
                        filters={filters}
                        onChange={handleFilterChange}
                    />

                    <TareasList 
                        tareas={tareas?.data || []}
                        onDelete={handleDelete}
                    />

                    <TareasPagination links={tareas?.links || []} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}