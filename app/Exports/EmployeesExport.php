<?php

namespace App\Exports;

use App\Models\Employee;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EmployeesExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Employee::with(['department', 'section', 'position', 'group', 'payGroup'])
            ->orderBy('nik')
            ->get();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'NIK',
            'Name',
            'Email',
            'Phone',
            'ID Card',
            'Birth Place',
            'Birth Date',
            'Gender',
            'Religion',
            'Marital Status',
            'Address',
            'City',
            'Postal Code',
            'Department',
            'Section',
            'Position',
            'Group',
            'Pay Group',
            'Employment Type',
            'TMT',
            'Status',
            'Bank Name',
            'Bank Account',
            'Bank Holder',
            'Tax Number',
            'BPJS Kesehatan',
            'BPJS Ketenagakerjaan',
        ];
    }

    /**
     * @param Employee $employee
     * @return array
     */
    public function map($employee): array
    {
        return [
            $employee->nik,
            $employee->name,
            $employee->email,
            $employee->phone,
            $employee->id_card,
            $employee->birth_place,
            $employee->birth_date,
            $employee->gender,
            $employee->religion,
            $employee->marital_status,
            $employee->address,
            $employee->city,
            $employee->postal_code,
            $employee->department?->name,
            $employee->section?->name,
            $employee->position?->name,
            $employee->group?->name,
            $employee->payGroup?->name,
            $employee->employment_type,
            $employee->tmt,
            $employee->status,
            $employee->bank_name,
            $employee->bank_account,
            $employee->bank_holder,
            $employee->tax_number,
            $employee->bpjs_kesehatan,
            $employee->bpjs_ketenagakerjaan,
        ];
    }

    /**
     * @param Worksheet $sheet
     */
    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
