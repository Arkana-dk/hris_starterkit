import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, FileText, DollarSign } from 'lucide-react';

export default function EmployeeDashboard() {
    return (
        <>
            <Head title="Employee Dashboard" />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto space-y-6 p-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Employee Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Your personal workspace.
                        </p>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="cursor-pointer transition-shadow hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    My Attendance
                                </CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    Clock In/Out
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Manage your attendance
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer transition-shadow hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Leave Request
                                </CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    Apply Leave
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Request time off
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer transition-shadow hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Overtime
                                </CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    Submit OT
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Overtime requests
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer transition-shadow hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Payslip
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    View Payslip
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Your salary details
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to HRIS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Employee self-service portal features will be
                                available soon.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
