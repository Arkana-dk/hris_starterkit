import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Edit,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    CreditCard,
} from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { BreadcrumbItem, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'HR', href: '#' },
    { title: 'Employees', href: '/admin/hr/employee' },
    { title: 'Detail', href: '#' },
];

interface Employee {
    id: number;
    nik: string;
    name: string;
    email: string | null;
    phone: string | null;
    id_card: string | null;
    birth_place: string | null;
    birth_date: string | null;
    gender: string | null;
    religion: string | null;
    marital_status: string | null;
    address: string | null;
    city: string | null;
    postal_code: string | null;
    department: { id: number; name: string; code: string } | null;
    section: { id: number; name: string; code: string } | null;
    position: { id: number; name: string; code: string } | null;
    group: { id: number; name: string; code: string } | null;
    payGroup: { id: number; name: string; code: string } | null;
    employment_type: string | null;
    tmt: string | null;
    status: string;
    bank_name: string | null;
    bank_account: string | null;
    bank_holder: string | null;
    tax_number: string | null;
    bpjs_kesehatan: string | null;
    bpjs_ketenagakerjaan: string | null;
    user: { id: number; name: string; email: string } | null;
}

interface PageProps extends SharedData {
    employee: Employee;
}

export default function EmployeeShow() {
    const { employee } = usePage<PageProps>().props;

    const getStatusBadge = (status: string) => {
        const variants: Record<
            string,
            'default' | 'secondary' | 'destructive' | 'outline'
        > = {
            active: 'default',
            inactive: 'secondary',
            suspended: 'destructive',
            resigned: 'outline',
        };
        return (
            <Badge variant={variants[status] || 'default'}>
                {status.toUpperCase()}
            </Badge>
        );
    };

    const formatDate = (date: string | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Employee: ${employee.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {employee.name}
                        </h1>
                        <p className="text-muted-foreground">
                            Employee ID: {employee.nik}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        <Link
                            href={route('admin.hr.employee.edit', employee.id)}
                        >
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 md:col-span-2">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Full Name
                                        </p>
                                        <p className="text-base font-semibold">
                                            {employee.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            NIK
                                        </p>
                                        <p className="text-base font-semibold">
                                            {employee.nik}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            ID Card Number
                                        </p>
                                        <p className="text-base">
                                            {employee.id_card || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Gender
                                        </p>
                                        <p className="text-base capitalize">
                                            {employee.gender || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Birth Place
                                        </p>
                                        <p className="text-base">
                                            {employee.birth_place || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Birth Date
                                        </p>
                                        <p className="text-base">
                                            {formatDate(employee.birth_date)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Religion
                                        </p>
                                        <p className="text-base capitalize">
                                            {employee.religion || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Marital Status
                                        </p>
                                        <p className="text-base capitalize">
                                            {employee.marital_status || '-'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Email
                                        </p>
                                        <p className="font-medium">
                                            {employee.email || '-'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Phone
                                        </p>
                                        <p className="font-medium">
                                            {employee.phone || '-'}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">
                                            Address
                                        </p>
                                        <p className="font-medium">
                                            {employee.address || '-'}
                                        </p>
                                        {(employee.city ||
                                            employee.postal_code) && (
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {employee.city}
                                                {employee.city &&
                                                    employee.postal_code &&
                                                    ', '}
                                                {employee.postal_code}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Financial Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Financial & Benefits
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Bank Name
                                        </p>
                                        <p className="text-base">
                                            {employee.bank_name || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Account Number
                                        </p>
                                        <p className="font-mono text-base">
                                            {employee.bank_account || '-'}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Account Holder
                                        </p>
                                        <p className="text-base">
                                            {employee.bank_holder || '-'}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Tax Number (NPWP)
                                        </p>
                                        <p className="font-mono text-base">
                                            {employee.tax_number || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            BPJS Kesehatan
                                        </p>
                                        <p className="font-mono text-base">
                                            {employee.bpjs_kesehatan || '-'}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            BPJS Ketenagakerjaan
                                        </p>
                                        <p className="font-mono text-base">
                                            {employee.bpjs_ketenagakerjaan ||
                                                '-'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Employment Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Employment Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        Status
                                    </p>
                                    {getStatusBadge(employee.status)}
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Employment Type
                                    </p>
                                    <p className="font-medium capitalize">
                                        {employee.employment_type || '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Join Date (TMT)
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(employee.tmt)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Organization */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Organization
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Department
                                    </p>
                                    <p className="font-semibold">
                                        {employee.department?.name || '-'}
                                    </p>
                                    {employee.department?.code && (
                                        <p className="text-sm text-muted-foreground">
                                            {employee.department.code}
                                        </p>
                                    )}
                                </div>
                                {employee.section && (
                                    <>
                                        <Separator />
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Section
                                            </p>
                                            <p className="font-semibold">
                                                {employee.section.name}
                                            </p>
                                            {employee.section.code && (
                                                <p className="text-sm text-muted-foreground">
                                                    {employee.section.code}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
                                <Separator />
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Position
                                    </p>
                                    <p className="font-semibold">
                                        {employee.position?.name || '-'}
                                    </p>
                                    {employee.position?.code && (
                                        <p className="text-sm text-muted-foreground">
                                            {employee.position.code}
                                        </p>
                                    )}
                                </div>
                                {employee.group && (
                                    <>
                                        <Separator />
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Group
                                            </p>
                                            <p className="font-medium">
                                                {employee.group.name}
                                            </p>
                                        </div>
                                    </>
                                )}
                                {employee.payGroup && (
                                    <>
                                        <Separator />
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Pay Group
                                            </p>
                                            <p className="font-medium">
                                                {employee.payGroup.name}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* User Account */}
                        {employee.user && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>User Account</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Username
                                            </p>
                                            <p className="font-medium">
                                                {employee.user.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Email
                                            </p>
                                            <p className="font-medium">
                                                {employee.user.email}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
