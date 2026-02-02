import { Head, usePage } from '@inertiajs/react';
import {
    Users,
    UserPlus,
    Building2,
    Calendar,
    Clock,
    FileText,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import type { BreadcrumbItem, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Dashboard', href: '#' },
];

interface DashboardStats {
    totalEmployees: number;
    newJoiners: number;
    totalDepartments: number;
    attendanceRate: number;
    pendingLeave: number;
    pendingOvertime: number;
}

interface Employee {
    id: number;
    name: string;
    email: string;
    department: { name: string } | null;
    position: { name: string } | null;
    created_at: string;
}

interface DepartmentDistribution {
    name: string;
    count: number;
}

interface PageProps extends SharedData {
    stats: DashboardStats;
    recentEmployees: Employee[];
    departmentDistribution: DepartmentDistribution[];
}

export default function AdminDashboard() {
    const { stats, recentEmployees, departmentDistribution } =
        usePage<PageProps>().props;

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here's your overview.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                                Active employees
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                New Joiners
                            </CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.newJoiners}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                This month
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
                                Total departments
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Attendance Rate
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.attendanceRate}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Today's attendance
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending Leave
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.pendingLeave}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Awaiting approval
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending Overtime
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.pendingOvertime}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Awaiting approval
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Recent Employees */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Employees</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentEmployees.map((employee) => (
                                    <div
                                        key={employee.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {employee.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {employee.department?.name ||
                                                    'No Department'}{' '}
                                                •{' '}
                                                {employee.position?.name ||
                                                    'No Position'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Department Distribution */}
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
        </AdminLayout>
    );
}
