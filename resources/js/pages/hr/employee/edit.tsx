import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { BreadcrumbItem, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'HR', href: '#' },
    { title: 'Employees', href: '/admin/hr/employee' },
    { title: 'Edit', href: '#' },
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
    department_id: number;
    section_id: number | null;
    position_id: number;
    group_id: number | null;
    pay_group_id: number | null;
    employment_type: string | null;
    tmt: string | null;
    status: string;
    bank_name: string | null;
    bank_account: string | null;
    bank_holder: string | null;
    tax_number: string | null;
    bpjs_kesehatan: string | null;
    bpjs_ketenagakerjaan: string | null;
}

interface Department {
    id: number;
    name: string;
    code: string;
}

interface Section {
    id: number;
    name: string;
    code: string;
    department_id: number;
}

interface Position {
    id: number;
    name: string;
    code: string;
}

interface Group {
    id: number;
    name: string;
    code: string;
}

interface PayGroup {
    id: number;
    name: string;
    code: string;
}

interface PageProps extends SharedData {
    employee: Employee;
    departments: Department[];
    sections: Section[];
    positions: Position[];
    groups: Group[];
    payGroups: PayGroup[];
}

export default function EmployeeEdit() {
    const { employee, departments, sections, positions, groups, payGroups } =
        usePage<PageProps>().props;

    const { data, setData, put, processing, errors } = useForm({
        nik: employee.nik,
        name: employee.name,
        email: employee.email || '',
        phone: employee.phone || '',
        id_card: employee.id_card || '',
        birth_place: employee.birth_place || '',
        birth_date: employee.birth_date || '',
        gender: employee.gender || '',
        religion: employee.religion || '',
        marital_status: employee.marital_status || '',
        address: employee.address || '',
        city: employee.city || '',
        postal_code: employee.postal_code || '',
        department_id: String(employee.department_id),
        section_id: employee.section_id ? String(employee.section_id) : '',
        position_id: String(employee.position_id),
        group_id: employee.group_id ? String(employee.group_id) : '',
        pay_group_id: employee.pay_group_id
            ? String(employee.pay_group_id)
            : '',
        employment_type: employee.employment_type || '',
        tmt: employee.tmt || '',
        status: employee.status,
        bank_name: employee.bank_name || '',
        bank_account: employee.bank_account || '',
        bank_holder: employee.bank_holder || '',
        tax_number: employee.tax_number || '',
        bpjs_kesehatan: employee.bpjs_kesehatan || '',
        bpjs_ketenagakerjaan: employee.bpjs_ketenagakerjaan || '',
    });

    const filteredSections = sections.filter(
        (section) =>
            !data.department_id ||
            section.department_id === Number(data.department_id),
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.hr.employee.update', employee.id));
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Employee: ${employee.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Edit Employee
                        </h1>
                        <p className="text-muted-foreground">
                            Update employee information
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Employee's basic personal information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="nik">NIK *</Label>
                                <Input
                                    id="nik"
                                    value={data.nik}
                                    onChange={(e) =>
                                        setData('nik', e.target.value)
                                    }
                                    className={
                                        errors.nik ? 'border-destructive' : ''
                                    }
                                />
                                {errors.nik && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.nik}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className={
                                        errors.name ? 'border-destructive' : ''
                                    }
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className={
                                        errors.email ? 'border-destructive' : ''
                                    }
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="id_card">ID Card Number</Label>
                                <Input
                                    id="id_card"
                                    value={data.id_card}
                                    onChange={(e) =>
                                        setData('id_card', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="birth_place">Birth Place</Label>
                                <Input
                                    id="birth_place"
                                    value={data.birth_place}
                                    onChange={(e) =>
                                        setData('birth_place', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="birth_date">Birth Date</Label>
                                <Input
                                    id="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) =>
                                        setData('birth_date', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(value) =>
                                        setData('gender', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="religion">Religion</Label>
                                <Input
                                    id="religion"
                                    value={data.religion}
                                    onChange={(e) =>
                                        setData('religion', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="marital_status">
                                    Marital Status
                                </Label>
                                <Select
                                    value={data.marital_status}
                                    onValueChange={(value) =>
                                        setData('marital_status', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="single">
                                            Single
                                        </SelectItem>
                                        <SelectItem value="married">
                                            Married
                                        </SelectItem>
                                        <SelectItem value="divorced">
                                            Divorced
                                        </SelectItem>
                                        <SelectItem value="widowed">
                                            Widowed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Address Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Address Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData('address', e.target.value)
                                    }
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData('city', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="postal_code">Postal Code</Label>
                                <Input
                                    id="postal_code"
                                    value={data.postal_code}
                                    onChange={(e) =>
                                        setData('postal_code', e.target.value)
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Employment Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Employment Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="department_id">
                                    Department *
                                </Label>
                                <Select
                                    value={data.department_id}
                                    onValueChange={(value) => {
                                        setData('department_id', value);
                                        setData('section_id', '');
                                    }}
                                >
                                    <SelectTrigger
                                        className={
                                            errors.department_id
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    >
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                {errors.department_id && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.department_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="section_id">Section</Label>
                                <Select
                                    value={data.section_id}
                                    onValueChange={(value) =>
                                        setData('section_id', value)
                                    }
                                    disabled={!data.department_id}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredSections.map((section) => (
                                            <SelectItem
                                                key={section.id}
                                                value={String(section.id)}
                                            >
                                                {section.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="position_id">Position *</Label>
                                <Select
                                    value={data.position_id}
                                    onValueChange={(value) =>
                                        setData('position_id', value)
                                    }
                                >
                                    <SelectTrigger
                                        className={
                                            errors.position_id
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    >
                                        <SelectValue placeholder="Select position" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                {errors.position_id && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.position_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="group_id">Group</Label>
                                <Select
                                    value={data.group_id}
                                    onValueChange={(value) =>
                                        setData('group_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {groups.map((group) => (
                                            <SelectItem
                                                key={group.id}
                                                value={String(group.id)}
                                            >
                                                {group.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="pay_group_id">Pay Group</Label>
                                <Select
                                    value={data.pay_group_id}
                                    onValueChange={(value) =>
                                        setData('pay_group_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select pay group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {payGroups.map((pg) => (
                                            <SelectItem
                                                key={pg.id}
                                                value={String(pg.id)}
                                            >
                                                {pg.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="employment_type">
                                    Employment Type
                                </Label>
                                <Select
                                    value={data.employment_type}
                                    onValueChange={(value) =>
                                        setData('employment_type', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="permanent">
                                            Permanent
                                        </SelectItem>
                                        <SelectItem value="contract">
                                            Contract
                                        </SelectItem>
                                        <SelectItem value="probation">
                                            Probation
                                        </SelectItem>
                                        <SelectItem value="internship">
                                            Internship
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="tmt">TMT (Join Date)</Label>
                                <Input
                                    id="tmt"
                                    type="date"
                                    value={data.tmt}
                                    onChange={(e) =>
                                        setData('tmt', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="status">Status *</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData('status', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                        </CardContent>
                    </Card>

                    {/* Financial & Benefits Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Financial & Benefits Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="bank_name">Bank Name</Label>
                                <Input
                                    id="bank_name"
                                    value={data.bank_name}
                                    onChange={(e) =>
                                        setData('bank_name', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="bank_account">
                                    Bank Account Number
                                </Label>
                                <Input
                                    id="bank_account"
                                    value={data.bank_account}
                                    onChange={(e) =>
                                        setData('bank_account', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="bank_holder">
                                    Bank Account Holder Name
                                </Label>
                                <Input
                                    id="bank_holder"
                                    value={data.bank_holder}
                                    onChange={(e) =>
                                        setData('bank_holder', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="tax_number">
                                    Tax Number (NPWP)
                                </Label>
                                <Input
                                    id="tax_number"
                                    value={data.tax_number}
                                    onChange={(e) =>
                                        setData('tax_number', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="bpjs_kesehatan">
                                    BPJS Kesehatan
                                </Label>
                                <Input
                                    id="bpjs_kesehatan"
                                    value={data.bpjs_kesehatan}
                                    onChange={(e) =>
                                        setData(
                                            'bpjs_kesehatan',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="bpjs_ketenagakerjaan">
                                    BPJS Ketenagakerjaan
                                </Label>
                                <Input
                                    id="bpjs_ketenagakerjaan"
                                    value={data.bpjs_ketenagakerjaan}
                                    onChange={(e) =>
                                        setData(
                                            'bpjs_ketenagakerjaan',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Updating...' : 'Update Employee'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
