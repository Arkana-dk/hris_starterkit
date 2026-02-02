import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Users,
    Plus,
    Search,
    Download,
    Upload,
    FileText,
    Edit,
    Trash2,
    Eye,
    Filter,
} from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem, SharedData, PaginatedData } from '@/types';
import admin from '@/routes/admin';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'HR', href: '#' },
    { title: 'Employees', href: '#' },
];

interface Employee {
    id: number;
    nik: string;
    name: string;
    email: string | null;
    phone: string | null;
    department: { id: number; name: string } | null;
    section: { id: number; name: string } | null;
    position: { id: number; name: string } | null;
    status: 'active' | 'inactive' | 'suspended' | 'resigned';
    tmt: string | null;
}

interface Department {
    id: number;
    name: string;
}

interface Position {
    id: number;
    name: string;
}

interface Filters {
    search?: string;
    department_id?: string;
    position_id?: string;
    status?: string;
}

interface PageProps extends SharedData {
    employees: PaginatedData<Employee>;
    filters: Filters;
    departments: Department[];
    positions: Position[];
}

export default function EmployeeIndex() {
    const { employees, filters, departments, positions } =
        usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [departmentId, setDepartmentId] = useState(
        filters.department_id || '',
    );
    const [positionId, setPositionId] = useState(filters.position_id || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        employee: Employee | null;
    }>({
        open: false,
        employee: null,
    });
    const [importDialog, setImportDialog] = useState(false);
    const [importFile, setImportFile] = useState<File | null>(null);

    const handleSearch = () => {
        router.get(
            admin.hr.employee.index.url(),
            {
                search,
                department_id: departmentId,
                position_id: positionId,
                status: statusFilter,
            },
            { preserveState: true },
        );
    };

    const handleReset = () => {
        setSearch('');
        setDepartmentId('');
        setPositionId('');
        setStatusFilter('');
        router.get(admin.hr.employee.index.url());
    };

    const handleDelete = () => {
        if (!deleteDialog.employee) return;

        router.delete(
            admin.hr.employee.destroy.url({
                employee: deleteDialog.employee.id,
            }),
            {
                onSuccess: () =>
                    setDeleteDialog({ open: false, employee: null }),
            },
        );
    };

    const handleExport = () => {
        window.location.href = admin.hr.employee.export.url();
    };

    const handleImport = () => {
        if (!importFile) return;

        const formData = new FormData();
        formData.append('file', importFile);

        router.post(admin.hr.employee.import.url(), formData, {
            onSuccess: () => {
                setImportDialog(false);
                setImportFile(null);
            },
        });
    };

    const handleDownloadTemplate = () => {
        window.location.href = admin.hr.employee.template.url();
    };

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
        return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Employee Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage employee data and information
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setImportDialog(true)}
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Import
                        </Button>
                        <Button variant="outline" onClick={handleExport}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Link href={admin.hr.employee.create.url()}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Employee
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <div>
                                <Input
                                    placeholder="Search by NIK, name, email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleSearch()
                                    }
                                />
                            </div>
                            <div>
                                <Select
                                    value={departmentId}
                                    onValueChange={setDepartmentId}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Departments" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            All Departments
                                        </SelectItem>
                                        {departments.map((dept) => (
                                            <SelectItem
                                                key={dept.id}
                                                value={String(dept.id)}
                                            >
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select
                                    value={positionId}
                                    onValueChange={setPositionId}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Positions" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            All Positions
                                        </SelectItem>
                                        {positions.map((pos) => (
                                            <SelectItem
                                                key={pos.id}
                                                value={String(pos.id)}
                                            >
                                                {pos.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            Inactive
                                        </SelectItem>
                                        <SelectItem value="suspended">
                                            Suspended
                                        </SelectItem>
                                        <SelectItem value="resigned">
                                            Resigned
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSearch}
                                    className="flex-1"
                                >
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </Button>
                                <Button variant="outline" onClick={handleReset}>
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{employees.total} Employees</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>NIK</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center text-muted-foreground"
                                        >
                                            No employees found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    employees.data.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">
                                                {employee.nik}
                                            </TableCell>
                                            <TableCell>
                                                {employee.name}
                                            </TableCell>
                                            <TableCell>
                                                {employee.email || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {employee.department?.name ||
                                                    '-'}
                                            </TableCell>
                                            <TableCell>
                                                {employee.position?.name || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(
                                                    employee.status,
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={admin.hr.employee.show.url(
                                                            {
                                                                employee:
                                                                    employee.id,
                                                            },
                                                        )}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={admin.hr.employee.edit.url(
                                                            {
                                                                employee:
                                                                    employee.id,
                                                            },
                                                        )}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            setDeleteDialog({
                                                                open: true,
                                                                employee,
                                                            })
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {employees.total > 15 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {employees.from} to {employees.to}{' '}
                                    of {employees.total} employees
                                </p>
                                <div className="flex gap-2">
                                    {employees.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={
                                                link.active
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url && router.get(link.url)
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    setDeleteDialog({ open, employee: null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Employee</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            {deleteDialog.employee?.name}? This action cannot be
                            undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialog({ open: false, employee: null })
                            }
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Import Dialog */}
            <Dialog open={importDialog} onOpenChange={setImportDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Import Employees</DialogTitle>
                        <DialogDescription>
                            Upload an Excel file to import employees. Download
                            the template first if needed.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Button
                            variant="outline"
                            onClick={handleDownloadTemplate}
                            className="w-full"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Download Template
                        </Button>
                        <Input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) =>
                                setImportFile(e.target.files?.[0] || null)
                            }
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setImportDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleImport} disabled={!importFile}>
                            <Upload className="mr-2 h-4 w-4" />
                            Import
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
