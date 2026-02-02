<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Department;
use App\Models\Section;
use App\Models\Position;
use App\Models\LeaveRequest;
use App\Models\OvertimeRequest;
use App\Models\PayRun;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $now = Carbon::now();
        $startMonth = $now->copy()->startOfMonth();
        $endMonth = $now->copy()->endOfMonth();

        // Global KPI
        $totalEmployees = Employee::count();
        $newJoiners = Employee::whereBetween('tmt', [$startMonth, $endMonth])->count();
        $totalDepartments = Department::count();
        $totalSections = Section::count();
        $totalPositions = Position::count();

        // Leave Statistics
        $pendingLeave = LeaveRequest::where('status', 'pending')->count();
        $approvedLeave = LeaveRequest::where('status', 'approved')
            ->whereBetween('created_at', [$startMonth, $endMonth])
            ->count();

        // Overtime Statistics
        $pendingOvertime = OvertimeRequest::where('status', 'pending')->count();
        $approvedOvertime = OvertimeRequest::where('status', 'approved')
            ->whereBetween('created_at', [$startMonth, $endMonth])
            ->count();

        // Payroll Statistics
        $totalPayRuns = PayRun::count();
        $activePayRuns = PayRun::whereIn('status', ['draft', 'pending'])->count();

        // System Statistics
        $totalRoles = Role::count();
        $totalPermissions = Permission::where('guard_name', 'web')->count();

        // Recent Activities
        $recentLeaveRequests = LeaveRequest::with(['employee', 'leaveType'])
            ->latest()
            ->take(5)
            ->get();

        $recentOvertimeRequests = OvertimeRequest::with('employee')
            ->latest()
            ->take(5)
            ->get();

        // Department Distribution
        $departmentDistribution = Employee::select('department_id')
            ->selectRaw('count(*) as count')
            ->with('department:id,name')
            ->groupBy('department_id')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->department->name ?? 'No Department',
                    'count' => $item->count,
                ];
            });

        return Inertia::render('superadmin/dashboard', [
            'stats' => [
                'totalEmployees' => $totalEmployees,
                'newJoiners' => $newJoiners,
                'totalDepartments' => $totalDepartments,
                'totalSections' => $totalSections,
                'totalPositions' => $totalPositions,
                'pendingLeave' => $pendingLeave,
                'approvedLeave' => $approvedLeave,
                'pendingOvertime' => $pendingOvertime,
                'approvedOvertime' => $approvedOvertime,
                'totalPayRuns' => $totalPayRuns,
                'activePayRuns' => $activePayRuns,
                'totalRoles' => $totalRoles,
                'totalPermissions' => $totalPermissions,
            ],
            'recentLeaveRequests' => $recentLeaveRequests,
            'recentOvertimeRequests' => $recentOvertimeRequests,
            'departmentDistribution' => $departmentDistribution,
        ]);
    }
}
