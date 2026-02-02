<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PayComponentRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'pay_component_id',
        'rate_type',
        'amount',
        'percentage',
        'effective_from',
        'effective_to',
        'is_active',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'percentage' => 'decimal:2',
        'effective_from' => 'date',
        'effective_to' => 'date',
        'is_active' => 'boolean',
    ];

    public function payComponent(): BelongsTo
    {
        return $this->belongsTo(PayComponent::class);
    }
}
