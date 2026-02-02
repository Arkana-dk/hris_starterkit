<?php

use App\Http\Controllers\SuperAdmin\Admin\AdminDashboardController;
use App\Http\Controllers\SuperAdmin\Admin\HRController;
use App\Http\Controllers\SuperAdmin\Admin\NotificationController;
use App\Http\Controllers\SuperAdmin\Admin\PayrollController;
use App\Http\Controllers\SuperAdmin\Management\UserRoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// SuperAdmin Routes
Route::prefix('superadmin')->middleware(['auth', 'verified'])->group(function () {
    // Management Routes
    Route::prefix('management')->group(function () {
        Route::get('user-roles', [UserRoleController::class, 'index'])->name('superadmin.management.user-roles');
    });

    // Admin Routes
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('superadmin.admin.dashboard');
        Route::get('notifications', [NotificationController::class, 'index'])->name('superadmin.admin.notifications');
        
        // Payroll Routes
        Route::get('payroll', [PayrollController::class, 'index'])->name('superadmin.admin.payroll');
        Route::get('payroll/pay-runs', [PayrollController::class, 'payRuns'])->name('superadmin.admin.payroll.pay-runs');
        Route::get('payroll/pay-groups', [PayrollController::class, 'payGroups'])->name('superadmin.admin.payroll.pay-groups');
        Route::get('payroll/group-components', [PayrollController::class, 'groupComponents'])->name('superadmin.admin.payroll.group-components');
        Route::get('payroll/pay-components', [PayrollController::class, 'payComponents'])->name('superadmin.admin.payroll.pay-components');
        Route::get('payroll/component-rates', [PayrollController::class, 'componentRates'])->name('superadmin.admin.payroll.component-rates');
        Route::get('payroll/audit', [PayrollController::class, 'audit'])->name('superadmin.admin.payroll.audit');
        
        // HR Routes
        Route::get('hr', [HRController::class, 'index'])->name('superadmin.admin.hr');
        
        // Master Karyawan
        Route::get('hr/data-pegawai', [HRController::class, 'dataPegawai'])->name('superadmin.admin.hr.data-pegawai');
        Route::get('hr/department', [HRController::class, 'department'])->name('superadmin.admin.hr.department');
        Route::get('hr/group', [HRController::class, 'group'])->name('superadmin.admin.hr.group');
        Route::get('hr/section', [HRController::class, 'section'])->name('superadmin.admin.hr.section');
        
        // Presensi & Pengajuan
        Route::get('hr/data-presensi', [HRController::class, 'dataPresensi'])->name('superadmin.admin.hr.data-presensi');
        Route::get('hr/pengajuan-absensi', [HRController::class, 'pengajuanAbsensi'])->name('superadmin.admin.hr.pengajuan-absensi');
        Route::get('hr/cuti-requests', [HRController::class, 'cutiRequests'])->name('superadmin.admin.hr.cuti-requests');
        Route::get('hr/lembur', [HRController::class, 'lembur'])->name('superadmin.admin.hr.lembur');
        Route::get('hr/pindah-shift', [HRController::class, 'pindahShift'])->name('superadmin.admin.hr.pindah-shift');
        Route::get('hr/rekap-presensi', [HRController::class, 'rekapPresensi'])->name('superadmin.admin.hr.rekap-presensi');
        
        // Setting Operasional
        Route::get('hr/setting-lokasi-absensi', [HRController::class, 'settingLokasiAbsensi'])->name('superadmin.admin.hr.setting-lokasi-absensi');
        Route::get('hr/work-schedules', [HRController::class, 'workSchedules'])->name('superadmin.admin.hr.work-schedules');
        Route::get('hr/shift', [HRController::class, 'shift'])->name('superadmin.admin.hr.shift');
        Route::get('hr/transportasi', [HRController::class, 'transportasi'])->name('superadmin.admin.hr.transportasi');
        
        // Manajemen Cuti
        Route::get('hr/jenis-cuti', [HRController::class, 'jenisCuti'])->name('superadmin.admin.hr.jenis-cuti');
        Route::get('hr/kebijakan-cuti', [HRController::class, 'kebijakanCuti'])->name('superadmin.admin.hr.kebijakan-cuti');
        Route::get('hr/hak-cuti', [HRController::class, 'hakCuti'])->name('superadmin.admin.hr.hak-cuti');
        Route::get('hr/generate-entitlements', [HRController::class, 'generateEntitlements'])->name('superadmin.admin.hr.generate-entitlements');
        Route::get('hr/ledger-cuti', [HRController::class, 'ledgerCuti'])->name('superadmin.admin.hr.ledger-cuti');
        Route::get('hr/laporan-cuti', [HRController::class, 'laporanCuti'])->name('superadmin.admin.hr.laporan-cuti');
    });
});

require __DIR__.'/settings.php';
