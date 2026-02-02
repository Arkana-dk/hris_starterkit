<?php

namespace App\Http\Controllers\Superadmin\HR;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Department;
use App\Models\Section;
use App\Models\Position;
use App\Models\Group;
use App\Models\PayGroup;
use App\Exports\EmployeesExport;
use App\Imports\EmployeesImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(Request $request): Response
    {
        $query = Employee::with([
            'department:id,name',
            'section:id,name',
            'position:id,name',
            'group:id,name',
            'payGroup:id,name'
        ]);

        // Search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('employee_number', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Department filter
        if ($request->has('department_id') && $request->department_id) {
            $query->where('department_id', $request->department_id);
        }

        // Position filter
        if ($request->has('position_id') && $request->position_id) {
            $query->where('position_id', $request->position_id);
        }

        // Status filter
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'employee_number');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $employees = $query->paginate(15)->withQueryString();

        // Get filter options
        $departments = Department::select('id', 'name')->orderBy('name')->get();
        $positions = Position::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('superadmin/hr/employee/index', [
            'employees' => $employees,
            'filters' => $request->only(['search', 'department_id', 'position_id', 'status']),
            'departments' => $departments,
            'positions' => $positions,
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create(): Response
    {
        $departments = Department::select('id', 'name', 'code')->orderBy('name')->get();
        $sections = Section::select('id', 'name', 'code', 'department_id')->orderBy('name')->get();
        $positions = Position::select('id', 'name', 'code')->orderBy('name')->get();
        $groups = Group::select('id', 'name', 'code')->orderBy('name')->get();
        $payGroups = PayGroup::select('id', 'name', 'code')->orderBy('name')->get();

        return Inertia::render('superadmin/hr/employee/create', [
            'departments' => $departments,
            'sections' => $sections,
            'positions' => $positions,
            'groups' => $groups,
            'payGroups' => $payGroups,
        ]);
    }

    /**
     * Store a newly created employee in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_number' => ['required', 'string', 'max:50', 'unique:employees,employee_number'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', 'unique:employees,email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'national_identity_number' => ['nullable', 'string', 'max:50'],
            'family_number_card' => ['nullable', 'string', 'max:50'],
            'place_of_birth' => ['nullable', 'string', 'max:100'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:male,female'],
            'religion' => ['nullable', 'string', 'max:50'],
            'marital_status' => ['nullable', 'in:single,married,divorced,widowed'],
            'dependents_count' => ['nullable', 'integer', 'min:0'],
            'address' => ['nullable', 'string'],
            'department_id' => ['required', 'exists:departments,id'],
            'section_id' => ['nullable', 'exists:sections,id'],
            'position_id' => ['required', 'exists:positions,id'],
            'group_id' => ['nullable', 'exists:groups,id'],
            'pay_group_id' => ['nullable', 'exists:pay_groups,id'],
            'tmt' => ['nullable', 'date'],
            'contract_end_date' => ['nullable', 'date'],
            'status' => ['required', 'in:active,inactive,suspended,resigned'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'bank_name' => ['nullable', 'string', 'max:100'],
            'bank_account_number' => ['nullable', 'string', 'max:50'],
            'bank_account_name' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:10'],
        ]);

        try {
            DB::beginTransaction();

            $employee = Employee::create($validated);

            DB::commit();

            return redirect()
                ->route('superadmin.hr.employee.index')
                ->with('success', 'Employee created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()
                ->withInput()
                ->with('error', 'Failed to create employee: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified employee.
     */
    public function show(Employee $employee): Response
    {
        $employee->load([
            'department',
            'section',
            'position',
            'group',
            'payGroup',
            'user',
        ]);

        return Inertia::render('superadmin/hr/employee/show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee): Response
    {
        $employee->load(['department', 'section', 'position', 'group', 'payGroup']);

        $departments = Department::select('id', 'name', 'code')->orderBy('name')->get();
        $sections = Section::select('id', 'name', 'code', 'department_id')->orderBy('name')->get();
        $positions = Position::select('id', 'name', 'code')->orderBy('name')->get();
        $groups = Group::select('id', 'name', 'code')->orderBy('name')->get();
        $payGroups = PayGroup::select('id', 'name', 'code')->orderBy('name')->get();

        return Inertia::render('superadmin/hr/employee/edit', [
            'employee' => $employee,
            'departments' => $departments,
            'sections' => $sections,
            'positions' => $positions,
            'groups' => $groups,
            'payGroups' => $payGroups,
        ]);
    }

    /**
     * Update the specified employee in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'employee_number' => ['required', 'string', 'max:50', Rule::unique('employees')->ignore($employee->id)],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', Rule::unique('employees')->ignore($employee->id)],
            'phone' => ['nullable', 'string', 'max:20'],
            'national_identity_number' => ['nullable', 'string', 'max:50'],
            'family_number_card' => ['nullable', 'string', 'max:50'],
            'place_of_birth' => ['nullable', 'string', 'max:100'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:male,female'],
            'religion' => ['nullable', 'string', 'max:50'],
            'marital_status' => ['nullable', 'in:single,married,divorced,widowed'],
            'dependents_count' => ['nullable', 'integer', 'min:0'],
            'address' => ['nullable', 'string'],
            'department_id' => ['required', 'exists:departments,id'],
            'section_id' => ['nullable', 'exists:sections,id'],
            'position_id' => ['required', 'exists:positions,id'],
            'group_id' => ['nullable', 'exists:groups,id'],
            'pay_group_id' => ['nullable', 'exists:pay_groups,id'],
            'tmt' => ['nullable', 'date'],
            'contract_end_date' => ['nullable', 'date'],
            'status' => ['required', 'in:active,inactive,suspended,resigned'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'bank_name' => ['nullable', 'string', 'max:100'],
            'bank_account_number' => ['nullable', 'string', 'max:50'],
            'bank_account_name' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:10'],
        ]);

        try {
            DB::beginTransaction();

            $employee->update($validated);

            DB::commit();

            return redirect()
                ->route('superadmin.hr.employee.index')
                ->with('success', 'Employee updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()
                ->withInput()
                ->with('error', 'Failed to update employee: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified employee from storage.
     */
    public function destroy(Employee $employee)
    {
        try {
            DB::beginTransaction();

            $employee->delete();

            DB::commit();

            return redirect()
                ->route('superadmin.hr.employee.index')
                ->with('success', 'Employee deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()
                ->with('error', 'Failed to delete employee: ' . $e->getMessage());
        }
    }

    /**
     * Export employees to Excel.
     */
    public function export()
    {
        return Excel::download(new EmployeesExport, 'employees-' . date('Y-m-d') . '.xlsx');
    }

    /**
     * Import employees from Excel.
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:xlsx,xls,csv', 'max:5120'],
        ]);

        try {
            DB::beginTransaction();

            $import = new EmployeesImport();
            Excel::import($import, $request->file('file'));

            DB::commit();

            return redirect()
                ->route('superadmin.hr.employee.index')
                ->with('success', 'Employees imported successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()
                ->with('error', 'Failed to import employees: ' . $e->getMessage());
        }
    }

    /**
     * Download import template.
     */
    public function downloadTemplate()
    {
        $headers = [
            'Employee Number',
            'Name',
            'Email',
            'Phone',
            'National Identity Number',
            'Family Number Card',
            'Place of Birth',
            'Date of Birth',
            'Gender',
            'Religion',
            'Marital Status',
            'Dependents Count',
            'Address',
            'Department ID',
            'Section ID',
            'Position ID',
            'Group ID',
            'Pay Group ID',
            'TMT',
            'Contract End Date',
            'Status',
            'Salary',
            'Bank Name',
            'Bank Account Number',
            'Bank Account Name',
            'Title',
        ];

        $callback = function() use ($headers) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $headers);
            fclose($file);
        };

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="employee-import-template.csv"',
        ]);
    }
}
