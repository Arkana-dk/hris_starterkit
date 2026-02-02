<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeaveType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'max_days',
        'is_paid',
        'require_attachment',
        'is_active',
    ];

    protected $casts = [
        'is_paid' => 'boolean',
        'require_attachment' => 'boolean',
        'is_active' => 'boolean',
        'max_days' => 'integer',
    ];

    public function leaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function leavePolicies(): HasMany
    {
        return $this->hasMany(LeavePolicy::class);
    }

    public function leaveEntitlements(): HasMany
    {
        return $this->hasMany(LeaveEntitlement::class);
    }
}
