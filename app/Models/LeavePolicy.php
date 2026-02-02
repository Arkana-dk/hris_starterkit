<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeavePolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'leave_type_id',
        'name',
        'description',
        'max_days_per_year',
        'max_consecutive_days',
        'min_notice_days',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'max_days_per_year' => 'integer',
        'max_consecutive_days' => 'integer',
        'min_notice_days' => 'integer',
    ];

    public function leaveType(): BelongsTo
    {
        return $this->belongsTo(LeaveType::class);
    }
}
