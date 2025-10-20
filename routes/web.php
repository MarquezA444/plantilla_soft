<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
<<<<<<< HEAD
=======
use App\Http\Controllers\ContactoController;
>>>>>>> edc3b9d795f4ebfa000c4dbd0f8af1ca259e1cda

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
<<<<<<< HEAD
    
    // Rutas de tareas
    Route::resource('tareas', App\Http\Controllers\TareasController::class);
});

=======
});
Route::prefix('dashboard')->group(function(){

    Route::resource('/contactos', ContactoController::class);
});
>>>>>>> edc3b9d795f4ebfa000c4dbd0f8af1ca259e1cda
require __DIR__.'/auth.php';
