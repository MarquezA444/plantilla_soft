# Instalación del Proyecto Laravel con Breeze y React

## Fecha de Instalación
18 de Octubre, 2025

## Requisitos Previos
- PHP >= 8.1
- Composer
- Node.js y NPM

## Pasos de Instalación

### 1. Crear el proyecto Laravel
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft"
composer create-project laravel/laravel senasoft
```
Estado: ✅ Completado
- Proyecto Laravel v12.7.1 instalado
- 112 paquetes instalados correctamente
- Framework Laravel v12.34.0
- Nombre del proyecto: **senasoft**

---

### 2. Navegar al directorio del proyecto
```bash
cd senasoft
```
Estado: ✅ Completado

---

### 3. Instalar Laravel Breeze
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
composer require laravel/breeze --dev
```
Estado: ✅ Completado
- Laravel Breeze v2.3.8 instalado
- 1 paquete adicional instalado

---

### 4. Instalar Breeze con React
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
php artisan breeze:install react
```
Estado: ✅ Completado
- Inertia.js Laravel v2.0.10 instalado
- Laravel Sanctum v4.2.0 instalado
- Ziggy v2.6.0 instalado
- 338 paquetes NPM instalados automáticamente
- Build de producción completado exitosamente

---

### 5. Instalar dependencias de Node
```bash
npm install
```
Estado: ✅ Completado (Instalado automáticamente por Breeze)
- 338 paquetes instalados
- Build realizado exitosamente

---

## Cómo Ejecutar el Proyecto

### Iniciar el servidor de desarrollo Laravel
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
php artisan serve
```
El servidor estará disponible en: http://localhost:8000

### Compilar assets en modo desarrollo (en otra terminal)
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
npm run dev
```

### Compilar assets para producción
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
npm run build
```

---

## Notas
- Este proyecto utiliza Laravel Breeze para autenticación
- El frontend está configurado con React
- Se incluye configuración de Inertia.js para la comunicación entre Laravel y React
- El proyecto se encuentra en: `c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft`
- Todas las migraciones de base de datos se ejecutaron automáticamente

---

## Desarrollo de la Aplicación de Tareas (CRUD)

### 6. Configurar Base de Datos MySQL
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
```

**Editar archivo `.env`:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=senasoft_tareas
DB_USERNAME=root
DB_PASSWORD=
```

**Crear la base de datos:**
```sql
CREATE DATABASE senasoft_tareas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Estado: ⏳ Pendiente

---

### 7. Generar Modelo, Migración y Controlador de Tareas
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
php artisan make:model Tarea -mcr
```

**Opciones del comando:**
- `-m` : Crea la migración
- `-c` : Crea el controlador
- `-r` : Hace el controlador tipo resource (con métodos CRUD)

Estado: ⏳ Pendiente

**Editar la migración** `database/migrations/xxxx_create_tareas_table.php`:
```php
public function up(): void
{
    Schema::create('tareas', function (Blueprint $table) {
        $table->id();
        $table->string('titulo');
        $table->text('descripcion')->nullable();
        $table->enum('estado', ['pendiente', 'en_progreso', 'completada'])->default('pendiente');
        $table->date('fecha_limite')->nullable();
        $table->timestamps();
    });
}
```

**Editar el modelo** `app/Models/Tarea.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    protected $fillable = [
        'titulo',
        'descripcion',
        'estado',
        'fecha_limite'
    ];

    protected $casts = [
        'fecha_limite' => 'date',
    ];
}
```

**Ejecutar las migraciones:**
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
php artisan migrate
```

Estado: ⏳ Pendiente

---

### 8. Configurar Rutas y Controlador

**Editar** `routes/web.php`:
```php
<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TareaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Rutas para el CRUD de Tareas
    Route::resource('tareas', TareaController::class);
});

require __DIR__.'/auth.php';
```

**Editar el controlador** `app/Http/Controllers/TareaController.php`:
```php
<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TareaController extends Controller
{
    // Mostrar lista de tareas
    public function index()
    {
        $tareas = Tarea::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Tareas/Index', [
            'tareas' => $tareas
        ]);
    }

    // Mostrar formulario de creación
    public function create()
    {
        return Inertia::render('Tareas/Create');
    }

    // Guardar nueva tarea
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'required|in:pendiente,en_progreso,completada',
            'fecha_limite' => 'nullable|date',
        ]);

        Tarea::create($validated);

        return redirect()->route('tareas.index')
            ->with('success', 'Tarea creada exitosamente.');
    }

    // Mostrar una tarea específica
    public function show(Tarea $tarea)
    {
        return Inertia::render('Tareas/Show', [
            'tarea' => $tarea
        ]);
    }

    // Mostrar formulario de edición
    public function edit(Tarea $tarea)
    {
        return Inertia::render('Tareas/Edit', [
            'tarea' => $tarea
        ]);
    }

    // Actualizar tarea
    public function update(Request $request, Tarea $tarea)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'required|in:pendiente,en_progreso,completada',
            'fecha_limite' => 'nullable|date',
        ]);

        $tarea->update($validated);

        return redirect()->route('tareas.index')
            ->with('success', 'Tarea actualizada exitosamente.');
    }

    // Eliminar tarea
    public function destroy(Tarea $tarea)
    {
        $tarea->delete();

        return redirect()->route('tareas.index')
            ->with('success', 'Tarea eliminada exitosamente.');
    }
}
```

Estado: ⏳ Pendiente

---

### 9. Crear Componentes React para el Frontend

**Crear archivo** `resources/js/Pages/Tareas/Index.jsx`:
```jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ tareas }) {
    const getEstadoColor = (estado) => {
        const colors = {
            'pendiente': 'bg-yellow-100 text-yellow-800',
            'en_progreso': 'bg-blue-100 text-blue-800',
            'completada': 'bg-green-100 text-green-800'
        };
        return colors[estado] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (date) => {
        if (!date) return 'Sin fecha';
        return new Date(date).toLocaleDateString('es-ES');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Gestión de Tareas
                    </h2>
                    <Link
                        href={route('tareas.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Nueva Tarea
                    </Link>
                </div>
            }
        >
            <Head title="Tareas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {tareas.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">
                                    No hay tareas registradas
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Título
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Descripción
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Estado
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fecha Límite
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tareas.map((tarea) => (
                                                <tr key={tarea.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {tarea.titulo}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">
                                                            {tarea.descripcion || 'Sin descripción'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(tarea.estado)}`}>
                                                            {tarea.estado.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDate(tarea.fecha_limite)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('tareas.edit', tarea.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <Link
                                                            href={route('tareas.destroy', tarea.id)}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-600 hover:text-red-900"
                                                            onBefore={() => confirm('¿Estás seguro de eliminar esta tarea?')}
                                                        >
                                                            Eliminar
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

**Crear archivo** `resources/js/Pages/Tareas/Create.jsx`:
```jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        titulo: '',
        descripcion: '',
        estado: 'pendiente',
        fecha_limite: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tareas.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Nueva Tarea
                </h2>
            }
        >
            <Head title="Nueva Tarea" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="titulo" value="Título *" />
                                    <TextInput
                                        id="titulo"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.titulo}
                                        onChange={(e) => setData('titulo', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.titulo} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="descripcion" value="Descripción" />
                                    <textarea
                                        id="descripcion"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.descripcion}
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        rows="4"
                                    />
                                    <InputError message={errors.descripcion} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="estado" value="Estado *" />
                                    <select
                                        id="estado"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.estado}
                                        onChange={(e) => setData('estado', e.target.value)}
                                        required
                                    >
                                        <option value="pendiente">Pendiente</option>
                                        <option value="en_progreso">En Progreso</option>
                                        <option value="completada">Completada</option>
                                    </select>
                                    <InputError message={errors.estado} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="fecha_limite" value="Fecha Límite" />
                                    <TextInput
                                        id="fecha_limite"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.fecha_limite}
                                        onChange={(e) => setData('fecha_limite', e.target.value)}
                                    />
                                    <InputError message={errors.fecha_limite} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-6 gap-3">
                                    <Link
                                        href={route('tareas.index')}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Crear Tarea
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

**Crear archivo** `resources/js/Pages/Tareas/Edit.jsx`:
```jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ tarea }) {
    const { data, setData, put, processing, errors } = useForm({
        titulo: tarea.titulo || '',
        descripcion: tarea.descripcion || '',
        estado: tarea.estado || 'pendiente',
        fecha_limite: tarea.fecha_limite || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('tareas.update', tarea.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Tarea
                </h2>
            }
        >
            <Head title="Editar Tarea" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="titulo" value="Título *" />
                                    <TextInput
                                        id="titulo"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.titulo}
                                        onChange={(e) => setData('titulo', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.titulo} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="descripcion" value="Descripción" />
                                    <textarea
                                        id="descripcion"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.descripcion}
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        rows="4"
                                    />
                                    <InputError message={errors.descripcion} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="estado" value="Estado *" />
                                    <select
                                        id="estado"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.estado}
                                        onChange={(e) => setData('estado', e.target.value)}
                                        required
                                    >
                                        <option value="pendiente">Pendiente</option>
                                        <option value="en_progreso">En Progreso</option>
                                        <option value="completada">Completada</option>
                                    </select>
                                    <InputError message={errors.estado} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="fecha_limite" value="Fecha Límite" />
                                    <TextInput
                                        id="fecha_limite"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.fecha_limite}
                                        onChange={(e) => setData('fecha_limite', e.target.value)}
                                    />
                                    <InputError message={errors.fecha_limite} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-6 gap-3">
                                    <Link
                                        href={route('tareas.index')}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Actualizar Tarea
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

Estado: ⏳ Pendiente

---

### 10. Compilar Assets y Probar la Aplicación

```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
npm run dev
```

**En otra terminal, iniciar el servidor:**
```bash
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"
php artisan serve
```

**Acceder a la aplicación:**
- URL: http://localhost:8000
- Primero registrar un usuario
- Luego acceder a: http://localhost:8000/tareas

Estado: ⏳ Pendiente

---

## Resumen de Funcionalidades CRUD

✅ **CREATE** - Crear nuevas tareas con título, descripción, estado y fecha límite
✅ **READ** - Listar todas las tareas con filtros visuales por estado
✅ **UPDATE** - Editar tareas existentes
✅ **DELETE** - Eliminar tareas con confirmación

### Estructura de la Base de Datos

**Tabla: tareas**
- `id` - Identificador único
- `titulo` - Título de la tarea (requerido)
- `descripcion` - Descripción detallada (opcional)
- `estado` - Estado: pendiente, en_progreso, completada
- `fecha_limite` - Fecha límite (opcional)
- `created_at` - Fecha de creación
- `updated_at` - Fecha de actualización

---

## Checklist de Implementación

- [ ] **Paso 6:** Configurar variables de entorno (.env) para MySQL
- [ ] **Paso 6:** Crear base de datos `senasoft_tareas`
- [ ] **Paso 7:** Ejecutar `php artisan make:model Tarea -mcr`
- [ ] **Paso 7:** Editar migración con campos de la tabla
- [ ] **Paso 7:** Editar modelo con $fillable y $casts
- [ ] **Paso 7:** Ejecutar `php artisan migrate`
- [ ] **Paso 8:** Agregar rutas en `routes/web.php`
- [ ] **Paso 8:** Implementar métodos del controlador `TareaController.php`
- [ ] **Paso 9:** Crear componente `Index.jsx` (Listado)
- [ ] **Paso 9:** Crear componente `Create.jsx` (Formulario crear)
- [ ] **Paso 9:** Crear componente `Edit.jsx` (Formulario editar)
- [ ] **Paso 10:** Ejecutar `npm run dev`
- [ ] **Paso 10:** Ejecutar `php artisan serve`
- [ ] **Paso 10:** Probar todas las funciones CRUD

---

## Comandos Rápidos de Referencia

```bash
# Directorio del proyecto
cd "c:\Users\crist\OneDrive\Desktop\carpeta\modelo 2 senasoft\senasoft"

# Crear modelo, migración y controlador
php artisan make:model Tarea -mcr

# Ejecutar migraciones
php artisan migrate

# Revertir migraciones
php artisan migrate:rollback

# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Iniciar servidor de desarrollo
php artisan serve

# Compilar assets en desarrollo
npm run dev

# Compilar assets para producción
npm run build
```

---

## Archivos Creados/Modificados

### Backend (Laravel)
1. `database/migrations/xxxx_create_tareas_table.php` - Migración
2. `app/Models/Tarea.php` - Modelo
3. `app/Http/Controllers/TareaController.php` - Controlador
4. `routes/web.php` - Rutas (modificado)
5. `.env` - Variables de entorno (modificado)

### Frontend (React)
1. `resources/js/Pages/Tareas/Index.jsx` - Listado de tareas
2. `resources/js/Pages/Tareas/Create.jsx` - Crear tarea
3. `resources/js/Pages/Tareas/Edit.jsx` - Editar tarea

---

## Troubleshooting

### Error de conexión a base de datos
- Verificar que MySQL esté corriendo
- Verificar credenciales en `.env`
- Verificar que la base de datos exista

### Errores de npm
```bash
# Limpiar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Errores de composer
```bash
# Limpiar e reinstalar
composer clear-cache
composer install
```
