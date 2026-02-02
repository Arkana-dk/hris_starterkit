<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PayRun extends Model
{
    use HasFactory;

    protected $fillable = [
        'pay_group_id',
        'period_start',
        'period_end',
        'payment_date',
        'status',
        'total_gross',
        'total_deductions',
        'total_net',
        'employee_count',
        'created_by',
        'approved_by',
        'approved_at',
        'finalized_at',
        'notes',
    ];

    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',
        'payment_date' => 'date',
        'approved_at' => 'datetime',
        'finalized_at' => 'datetime',
        'total_gross' => 'decimal:2',
        'total_deductions' => 'decimal:2',
        'total_net' => 'decimal:2',
        'employee_count' => 'integer',
    ];

    public function payGroup(): BelongsTo
    {
        return $this->belongsTo(PayGroup::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PayRunItem::class);
    }

    public function audits(): HasMany
    {
        return $this->hasMany(PayRunAudit::class);
    }
}
