<?php

namespace App\Imports;

use App\Models\Employee;
use App\Models\Department;
use App\Models\Position;
use App\Models\Section;
use App\Models\Group;
use App\Models\PayGroup;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsErrors;

class EmployeesImport implements ToModel, WithHeadingRow, WithValidation, SkipsEmptyRows, SkipsOnError
{
    use SkipsErrors;

    /**
     * @param array $row
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        // Find related entities
        $department = Department::where('name', $row['department'])->first();
        $section = Section::where('name', $row['section'])->first();
        $position = Position::where('name', $row['position'])->first();
        $group = Group::where('name', $row['group'])->first();
        $payGroup = PayGroup::where('name', $row['pay_group'])->first();

        return new Employee([
            'nik' => $row['nik'],
            'name' => $row['name'],
            'email' => $row['email'] ?? null,
            'phone' => $row['phone'] ?? null,
            'id_card' => $row['id_card'] ?? null,
            'birth_place' => $row['birth_place'] ?? null,
            'birth_date' => $row['birth_date'] ?? null,
            'gender' => $row['gender'] ?? null,
            'religion' => $row['religion'] ?? null,
            'marital_status' => $row['marital_status'] ?? null,
            'address' => $row['address'] ?? null,
            'city' => $row['city'] ?? null,
            'postal_code' => $row['postal_code'] ?? null,
            'department_id' => $department?->id,
            'section_id' => $section?->id,
            'position_id' => $position?->id,
            'group_id' => $group?->id,
            'pay_group_id' => $payGroup?->id,
            'employment_type' => $row['employment_type'] ?? null,
            'tmt' => $row['tmt'] ?? null,
            'status' => $row['status'] ?? 'active',
            'bank_name' => $row['bank_name'] ?? null,
            'bank_account' => $row['bank_account'] ?? null,
            'bank_holder' => $row['bank_holder'] ?? null,
            'tax_number' => $row['tax_number'] ?? null,
            'bpjs_kesehatan' => $row['bpjs_kesehatan'] ?? null,
            'bpjs_ketenagakerjaan' => $row['bpjs_ketenagakerjaan'] ?? null,
        ]);
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'nik' => ['required', 'string', 'max:50', 'unique:employees,nik'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', 'unique:employees,email'],
        ];
    }
}
