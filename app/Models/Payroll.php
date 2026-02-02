<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Payroll extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'pay_run_id',
        'period_start',
        'period_end',
        'payment_date',
        'basic_salary',
        'total_allowances',
        'total_deductions',
        'gross_salary',
        'net_salary',
        'status',
    ];

    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',
        'payment_date' => 'date',
        'basic_salary' => 'decimal:2',
        'total_allowances' => 'decimal:2',
        'total_deductions' => 'decimal:2',
        'gross_salary' => 'decimal:2',
        'net_salary' => 'decimal:2',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function payRun(): BelongsTo
    {
        return $this->belongsTo(PayRun::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(PayrollDetail::class);
    }
}
