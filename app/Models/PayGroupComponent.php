<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PayGroupComponent extends Model
{
    use HasFactory;

    protected $fillable = [
        'pay_group_id',
        'pay_component_id',
        'is_required',
        'default_amount',
        'display_order',
    ];

    protected $casts = [
        'is_required' => 'boolean',
        'default_amount' => 'decimal:2',
        'display_order' => 'integer',
    ];

    public function payGroup(): BelongsTo
    {
        return $this->belongsTo(PayGroup::class);
    }

    public function payComponent(): BelongsTo
    {
        return $this->belongsTo(PayComponent::class);
    }
}
