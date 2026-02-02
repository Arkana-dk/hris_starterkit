import { Head } from '@inertiajs/react';
import SuperadminLayout from '@/layouts/superadmin/superadmin-sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Users,
    Building2,
    Calendar,
    Clock,
    DollarSign,
    Shield,
    Briefcase,
    LayoutGrid,
} from 'lucide-react';

interface DashboardStats {
    totalEmployees: number;
    newJoiners: number;
    totalDepartments: number;
    totalSections: number;
    totalPositions: number;
    pendingLeave: number;
    approvedLeave: number;
    pendingOvertime: number;
    approvedOvertime: number;
    totalPayRuns: number;
    activePayRuns: number;
    totalRoles: number;
    totalPermissions: number;
}

interface LeaveRequest {
    id: number;
    employee: { name: string };
    leave_type: { name: string };
    start_date: string;
    end_date: string;
    status: string;
}

interface OvertimeRequest {
    id: number;
    employee: { name: string };
    date: string;
    duration: number;
    status: string;
}

interface DepartmentDistribution {
    name: string;
    count: number;
}

interface Props {
    stats: DashboardStats;
    recentLeaveRequests: LeaveRequest[];
    recentOvertimeRequests: OvertimeRequest[];
    departmentDistribution: DepartmentDistribution[];
}

export default function SuperadminDashboard({
    stats,
    recentLeaveRequests,
    recentOvertimeRequests,
    departmentDistribution,
}: Props) {
    return (
        <SuperadminLayout>
            <Head title="Superadmin Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Superadmin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Complete system overview and management.
                    </p>
                </div>

                {/* HR Stats */}
                <div>
                    <h2 className="mb-3 text-lg font-semibold">HR Overview</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Employees
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.totalEmployees}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    +{stats.newJoiners} this month
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Departments
                                </CardTitle>
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.totalDepartments}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.totalSections} sections
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Positions
                                </CardTitle>
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.totalPositions}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Total positions
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Leave Requests
                                </CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.pendingLeave}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.approvedLeave} approved this month
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Payroll & System Stats */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold">
                            Payroll & Operations
                        </h2>
                        <div className="grid gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Overtime Requests
                                    </CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.pendingOvertime}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {stats.approvedOvertime} approved this
                                        month
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Pay Runs
                                    </CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.totalPayRuns}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {stats.activePayRuns} active runs
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold">
                            System Management
                        </h2>
                        <div className="grid gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Roles
                                    </CardTitle>
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.totalRoles}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        System roles
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Permissions
                                    </CardTitle>
                                    <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.totalPermissions}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Total permissions
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Leave Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentLeaveRequests.length > 0 ? (
                                    recentLeaveRequests.map((leave) => (
                                        <div
                                            key={leave.id}
                                            className="flex items-center justify-between border-b pb-2"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {leave.employee.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {leave.leave_type.name} •{' '}
                                                    {leave.start_date} -{' '}
                                                    {leave.end_date}
                                                </p>
                                            </div>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs ${
                                                    leave.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : leave.status ===
                                                            'approved'
                                                          ? 'bg-green-100 text-green-800'
                                                          : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {leave.status}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No recent leave requests
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Department Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {departmentDistribution.map((dept, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="text-sm font-medium">
                                            {dept.name}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {dept.count} employees
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SuperadminLayout>
    );
}
