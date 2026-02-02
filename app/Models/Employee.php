<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'role',
        'name',
        'national_identity_number',
        'family_number_card',
        'email',
        'gender',
        'title',
        'photo',
        'address',
        'place_of_birth',
        'date_of_birth',
        'kk_number',
        'religion',
        'phone',
        'marital_status',
        'dependents_count',
        'education',
        'department_id',
        'position_id',
        'bank_name',
        'group_id',
        'section_id',
        'tmt',
        'contract_end_date',
        'salary',
        'bank_account_name',
        'bank_account_number',
        'employee_number',
        'pay_group_id',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'tmt' => 'date',
        'contract_end_date' => 'date',
        'salary' => 'decimal:2',
        'dependents_count' => 'integer',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function payGroup(): BelongsTo
    {
        return $this->belongsTo(PayGroup::class);
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    public function leaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function overtimeRequests(): HasMany
    {
        return $this->hasMany(OvertimeRequest::class);
    }

    public function leaveEntitlements(): HasMany
    {
        return $this->hasMany(LeaveEntitlement::class);
    }

    public function payrolls(): HasMany
    {
        return $this->hasMany(Payroll::class);
    }

    public function attendanceRequests(): HasMany
    {
        return $this->hasMany(AttendanceRequest::class);
    }

    public function shiftChangeRequests(): HasMany
    {
        return $this->hasMany(ShiftChangeRequest::class);
    }
}
