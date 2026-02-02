<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Superadmin\DashboardController as SuperadminDashboardController;
use App\Http\Controllers\Employee\DashboardController as EmployeeDashboardController;
use Illuminate\Support\Facades\Route;

// Redirect root to login
Route::get('/', function () {
    return redirect()->route('login');
});

// Generic dashboard - redirects based on role (handled by FortifyServiceProvider)
Route::get('dashboard', function () {
    $user = auth()->user();
    
    if ($user->hasRole('super-admin')) {
        return redirect()->route('superadmin.dashboard');
    }
    
    // Support both old and new role names
    if ($user->hasAnyRole(['system-admin', 'hr-staff', 'payroll-staff', 'hr-admin', 'payroll-admin'])) {
        return redirect()->route('admin.dashboard');
    }
    
    if ($user->hasRole('employee')) {
        return redirect()->route('employee.dashboard');
    }
    
    abort(403, 'No dashboard configured for your role.');
})->middleware(['auth'])->name('dashboard');

// ==================================================
// SUPERADMIN ROUTES
// ==================================================
Route::prefix('superadmin')
    ->middleware(['auth', 'role:super-admin'])
    ->name('superadmin.')
    ->group(function () {
        Route::get('dashboard', [SuperadminDashboardController::class, 'index'])->name('dashboard');
        
        // User & Role Management
        Route::get('user-roles', function () {
            return inertia('superadmin/user-roles');
        })->name('user-roles');
    });

// ==================================================
// ADMIN ROUTES (system-admin, hr-staff, payroll-staff)
// ==================================================
Route::prefix('admin')
    ->middleware(['auth', 'role:system-admin|hr-staff|payroll-staff|hr-admin|payroll-admin'])
    ->name('admin.')
    ->group(function () {
        Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        
        // HR Module - akan diisi nanti
        // Payroll Module - akan diisi nanti
        // Attendance Module - akan diisi nanti
    });

// ==================================================
// EMPLOYEE ROUTES (self-service)
// ==================================================
Route::prefix('employee')
    ->middleware(['auth', 'role:employee'])
    ->name('employee.')
    ->group(function () {
        Route::get('dashboard', [EmployeeDashboardController::class, 'index'])->name('dashboard');
    });

require __DIR__.'/settings.php';
