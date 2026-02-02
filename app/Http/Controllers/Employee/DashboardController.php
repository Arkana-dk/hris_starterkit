<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\LeaveEntitlement;
use App\Models\OvertimeRequest;
use App\Models\Payroll;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $employee = $user->employee;

        if (!$employee) {
            abort(404, 'Employee profile not found. Please contact HR.');
        }

        $now = Carbon::now();
        $startMonth = $now->copy()->startOfMonth();
        $endMonth = $now->copy()->endOfMonth();

        // Attendance Statistics
        $totalAttendance = Attendance::where('employee_id', $employee->id)
            ->whereBetween('date', [$startMonth, $endMonth])
            ->count();

        $presentDays = Attendance::where('employee_id', $employee->id)
            ->whereBetween('date', [$startMonth, $endMonth])
            ->whereNotNull('time_in')
            ->count();

        $lateDays = Attendance::where('employee_id', $employee->id)
            ->whereBetween('date', [$startMonth, $endMonth])
            ->where('late', true)
            ->count();

        // Leave Information
        $leaveBalance = LeaveEntitlement::where('employee_id', $employee->id)
            ->where('year', $now->year)
            ->sum('remaining');

        $pendingLeave = LeaveRequest::where('employee_id', $employee->id)
            ->where('status', 'pending')
            ->count();

        $approvedLeave = LeaveRequest::where('employee_id', $employee->id)
            ->where('status', 'approved')
            ->whereBetween('start_date', [$startMonth, $endMonth])
            ->count();

        // Overtime Requests
        $pendingOvertime = OvertimeRequest::where('employee_id', $employee->id)
            ->where('status', 'pending')
            ->count();

        $approvedOvertime = OvertimeRequest::where('employee_id', $employee->id)
            ->where('status', 'approved')
            ->whereBetween('date', [$startMonth, $endMonth])
            ->count();

        // Recent Payslips
        $recentPayslips = Payroll::where('employee_id', $employee->id)
            ->with('payRun')
            ->latest()
            ->take(3)
            ->get();

        // Recent Attendance
        $recentAttendance = Attendance::where('employee_id', $employee->id)
            ->with('shift')
            ->latest('date')
            ->take(7)
            ->get();

        return Inertia::render('employee/dashboard', [
            'stats' => [
                'totalAttendance' => $totalAttendance,
                'presentDays' => $presentDays,
                'lateDays' => $lateDays,
                'leaveBalance' => $leaveBalance,
                'pendingLeave' => $pendingLeave,
                'approvedLeave' => $approvedLeave,
                'pendingOvertime' => $pendingOvertime,
                'approvedOvertime' => $approvedOvertime,
            ],
            'recentPayslips' => $recentPayslips,
            'recentAttendance' => $recentAttendance,
            'employee' => [
                'id' => $employee->id,
                'nik' => $employee->nik,
                'name' => $employee->name,
                'email' => $employee->email,
                'department' => $employee->department?->name,
                'position' => $employee->position?->name,
                'join_date' => $employee->tmt,
            ],
        ]);
    }
}
