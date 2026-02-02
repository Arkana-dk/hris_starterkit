import { Head, usePage } from '@inertiajs/react';
import { BarChart3, Users, Calendar, TrendingUp } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import type { BreadcrumbItem, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Dashboard', href: '#' },
];

export default function AdminDashboard() {
    const { auth } = usePage<SharedData>().props;

    const stats = [
        {
            title: 'Total Employees',
            value: '245',
            icon: Users,
            trend: '+12%',
            trendUp: true,
        },
        {
            title: 'Present Today',
            value: '198',
            icon: Calendar,
            trend: '80%',
            trendUp: true,
        },
        {
            title: 'Pending Requests',
            value: '23',
            icon: BarChart3,
            trend: '-5%',
            trendUp: false,
        },
        {
            title: 'Performance',
            value: '94%',
            icon: TrendingUp,
            trend: '+8%',
            trendUp: true,
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Welcome back, {auth.user.name}!
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Here's what's happening with your organization today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-primary/10 p-3">
                                        <stat.icon className="size-6 text-primary" />
                                    </div>
                                </div>
                                <span
                                    className={`text-sm font-medium ${
                                        stat.trendUp
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                    }`}
                                >
                                    {stat.trend}
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {stat.title}
                                </h3>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    {/* Recent Requests */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Recent Requests
                        </h2>
                        <div className="mt-4 space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0 dark:border-gray-800"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Leave Request #{i}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            John Doe - 2 days ago
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                        Pending
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Quick Actions
                        </h2>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {[
                                'Add Employee',
                                'Mark Attendance',
                                'Generate Report',
                                'View Calendar',
                            ].map((action) => (
                                <button
                                    key={action}
                                    className="rounded-lg border border-gray-200 p-3 text-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-100 dark:hover:bg-gray-800"
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
