import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link } from '@inertiajs/react';

export default function TareasForm({ 
    initialData = {
        titulo: '',
        descripcion: '',
        estado: 'pendiente',
        prioridad: 'media',
        fecha_vencimiento: '',
        responsable: ''
    },
    submitUrl,
    submitMethod = 'post',
    buttonText = 'Guardar'
}) {
    const { data, setData, post, put, processing, errors, reset } = useForm(initialData);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (submitMethod === 'post') {
            post(submitUrl, {
                onSuccess: () => reset(),
            });
        } else if (submitMethod === 'put') {
            put(submitUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="titulo" value="Título *" />
                <TextInput
                    id="titulo"
                    type="text"
                    name="titulo"
                    value={data.titulo}
                    className="mt-1 block w-full"
                    autoComplete="titulo"
                    onChange={(e) => setData('titulo', e.target.value)}
                    required
                />
                <InputError message={errors.titulo} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="descripcion" value="Descripción" />
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={data.descripcion}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    rows="4"
                    onChange={(e) => setData('descripcion', e.target.value)}
                />
                <InputError message={errors.descripcion} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel htmlFor="estado" value="Estado *" />
                    <select
                        id="estado"
                        name="estado"
                        value={data.estado}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        onChange={(e) => setData('estado', e.target.value)}
                        required
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_progreso">En Progreso</option>
                        <option value="completada">Completada</option>
                    </select>
                    <InputError message={errors.estado} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="prioridad" value="Prioridad *" />
                    <select
                        id="prioridad"
                        name="prioridad"
                        value={data.prioridad}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        onChange={(e) => setData('prioridad', e.target.value)}
                        required
                    >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                    <InputError message={errors.prioridad} className="mt-2" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel htmlFor="fecha_vencimiento" value="Fecha de Vencimiento" />
                    <input
                        type="date"
                        id="fecha_vencimiento"
                        name="fecha_vencimiento"
                        value={data.fecha_vencimiento || ''}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        onChange={(e) => setData('fecha_vencimiento', e.target.value)}
                    />
                    <InputError message={errors.fecha_vencimiento} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="responsable" value="Responsable" />
                    <TextInput
                        id="responsable"
                        type="text"
                        name="responsable"
                        value={data.responsable || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('responsable', e.target.value)}
                    />
                    <InputError message={errors.responsable} className="mt-2" />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {processing ? 'Guardando...' : buttonText}
                </PrimaryButton>

                <Link href="/tareas">
                    <SecondaryButton type="button">
                        Cancelar
                    </SecondaryButton>
                </Link>
            </div>
        </form>
    );
}