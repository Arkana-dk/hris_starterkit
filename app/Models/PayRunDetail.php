<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PayRunDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'pay_run_item_id',
        'pay_component_id',
        'component_type',
        'amount',
        'calculation_details',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'calculation_details' => 'array',
    ];

    public function payRunItem(): BelongsTo
    {
        return $this->belongsTo(PayRunItem::class);
    }

    public function payComponent(): BelongsTo
    {
        return $this->belongsTo(PayComponent::class);
    }
}
