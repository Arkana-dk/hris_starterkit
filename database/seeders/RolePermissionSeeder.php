<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            // HR - Employee Management
            'hr.employee.view_basic',
            'hr.employee.view_detail',
            'hr.employee.manage',
            'hr.employee.import',
            'hr.employee.export',

            // HR - Attendance
            'hr.attendance.view',
            'hr.attendance.manage',
            'hr.attendance.approve',
            'hr.attendance.location.manage',

            // HR - Leave
            'hr.leave.view',
            'hr.leave.manage',
            'hr.leave.approve',
            'hr.leave.policy.manage',
            'hr.leave.entitlement.manage',

            // HR - Overtime
            'hr.overtime.view',
            'hr.overtime.approve',

            // Payroll
            'payroll.rate.manage',
            'payroll.run.view',
            'payroll.run.create',
            'payroll.run.simulate',
            'payroll.run.finalize',
            'payroll.run.reopen',
            'payroll.payslip.view_all',
            'payroll.payslip.view_self',

            // Organization
            'org.manage',
            'org.department.manage',
            'org.position.manage',
            'org.section.manage',

            // Shift Management
            'shift.manage',
            'shift-change.request.approve',

            // Transport
            'transport.setting.manage',

            // User & Role Management
            'user.role.manage',
            'user.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // API Guard Permissions (duplicate for API guard)
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'api']);
        }

        // Create Roles
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'web']);
        $systemAdmin = Role::firstOrCreate(['name' => 'system-admin', 'guard_name' => 'web']);
        $hrStaff = Role::firstOrCreate(['name' => 'hr-staff', 'guard_name' => 'web']);
        $payrollStaff = Role::firstOrCreate(['name' => 'payroll-staff', 'guard_name' => 'web']);
        $employee = Role::firstOrCreate(['name' => 'employee', 'guard_name' => 'web']);

        // Assign Permissions to Roles

        // Super Admin - All permissions
        $superAdmin->syncPermissions(Permission::where('guard_name', 'web')->get());

        // System Admin - All except user.role.manage
        $systemAdmin->syncPermissions(Permission::where('guard_name', 'web')
            ->where('name', '!=', 'user.role.manage')
            ->get());

        // HR Staff - HR related permissions
        $hrStaff->givePermissionTo([
            'hr.employee.view_basic',
            'hr.employee.view_detail',
            'hr.employee.manage',
            'hr.employee.import',
            'hr.employee.export',
            'hr.attendance.view',
            'hr.attendance.manage',
            'hr.attendance.approve',
            'hr.attendance.location.manage',
            'hr.leave.view',
            'hr.leave.manage',
            'hr.leave.approve',
            'hr.leave.policy.manage',
            'hr.leave.entitlement.manage',
            'hr.overtime.view',
            'hr.overtime.approve',
            'org.manage',
            'org.department.manage',
            'org.position.manage',
            'org.section.manage',
            'shift.manage',
            'shift-change.request.approve',
        ]);

        // Payroll Staff - Payroll related permissions
        $payrollStaff->givePermissionTo([
            'hr.employee.view_basic',
            'payroll.rate.manage',
            'payroll.run.view',
            'payroll.run.create',
            'payroll.run.simulate',
            'payroll.run.finalize',
            'payroll.run.reopen',
            'payroll.payslip.view_all',
        ]);

        // Employee - Self-service only
        $employee->givePermissionTo([
            'payroll.payslip.view_self',
        ]);

        // Create Test Users
        $this->createTestUsers($superAdmin, $systemAdmin, $hrStaff, $payrollStaff, $employee);
    }

    private function createTestUsers($superAdmin, $systemAdmin, $hrStaff, $payrollStaff, $employee)
    {
        // Super Admin
        $superAdminUser = User::firstOrCreate(
            ['email' => 'superadmin@hris.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
            ]
        );
        if (!$superAdminUser->hasRole('super-admin')) {
            $superAdminUser->assignRole($superAdmin);
        }

        // System Admin
        $systemAdminUser = User::firstOrCreate(
            ['email' => 'admin@hris.com'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('password'),
            ]
        );
        if (!$systemAdminUser->hasRole('system-admin')) {
            $systemAdminUser->assignRole($systemAdmin);
        }

        // HR Staff
        $hrUser = User::firstOrCreate(
            ['email' => 'hr@hris.com'],
            [
                'name' => 'HR Staff',
                'password' => Hash::make('password'),
            ]
        );
        if (!$hrUser->hasRole('hr-staff')) {
            $hrUser->assignRole($hrStaff);
        }

        // Payroll Staff
        $payrollUser = User::firstOrCreate(
            ['email' => 'payroll@hris.com'],
            [
                'name' => 'Payroll Staff',
                'password' => Hash::make('password'),
            ]
        );
        if (!$payrollUser->hasRole('payroll-staff')) {
            $payrollUser->assignRole($payrollStaff);
        }

        // Employee
        $employeeUser = User::firstOrCreate(
            ['email' => 'employee@hris.com'],
            [
                'name' => 'Test Employee',
                'password' => Hash::make('password'),
            ]
        );
        if (!$employeeUser->hasRole('employee')) {
            $employeeUser->assignRole($employee);
        }

        $this->command->info('✅ Test users created with credentials:');
        $this->command->info('   Super Admin: superadmin@hris.com / password');
        $this->command->info('   System Admin: admin@hris.com / password');
        $this->command->info('   HR Staff: hr@hris.com / password');
        $this->command->info('   Payroll Staff: payroll@hris.com / password');
        $this->command->info('   Employee: employee@hris.com / password');
    }
}
