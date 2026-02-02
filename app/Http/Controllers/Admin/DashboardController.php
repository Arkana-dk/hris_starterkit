<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Department;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\OvertimeRequest;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $now = Carbon::now();
        $startMonth = $now->copy()->startOfMonth();
        $endMonth = $now->copy()->endOfMonth();

        // KPI Metrics
        $totalEmployees = Employee::count();
        $newJoiners = Employee::whereBetween('tmt', [$startMonth, $endMonth])->count();
        $totalDepartments = Department::count();

        // Attendance Statistics
        $todayAttendance = Attendance::whereDate('date', $now->toDateString())->count();
        $attendanceRate = $totalEmployees > 0 
            ? round(($todayAttendance / $totalEmployees) * 100, 1) 
            : 0;

        // Pending Requests
        $pendingLeave = LeaveRequest::where('status', 'pending')->count();
        $pendingOvertime = OvertimeRequest::where('status', 'pending')->count();

        // Recent Employees
        $recentEmployees = Employee::with(['department', 'position'])
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

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalEmployees' => $totalEmployees,
                'newJoiners' => $newJoiners,
                'totalDepartments' => $totalDepartments,
                'attendanceRate' => $attendanceRate,
                'pendingLeave' => $pendingLeave,
                'pendingOvertime' => $pendingOvertime,
            ],
            'recentEmployees' => $recentEmployees,
            'departmentDistribution' => $departmentDistribution,
        ]);
    }
}
