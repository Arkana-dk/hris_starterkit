<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShiftChangeRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'current_shift_id',
        'requested_shift_id',
        'date',
        'reason',
        'status',
        'reviewed_by',
        'reviewed_at',
        'review_notes',
    ];

    protected $casts = [
        'date' => 'date',
        'reviewed_at' => 'datetime',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function currentShift(): BelongsTo
    {
        return $this->belongsTo(Shift::class, 'current_shift_id');
    }

    public function requestedShift(): BelongsTo
    {
        return $this->belongsTo(Shift::class, 'requested_shift_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
