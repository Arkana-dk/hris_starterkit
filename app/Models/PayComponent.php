<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PayComponent extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'type',
        'category',
        'calculation_method',
        'is_taxable',
        'is_prorated',
        'is_active',
        'description',
        'display_order',
    ];

    protected $casts = [
        'is_taxable' => 'boolean',
        'is_prorated' => 'boolean',
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    public function rates(): HasMany
    {
        return $this->hasMany(PayComponentRate::class);
    }

    public function groupComponents(): HasMany
    {
        return $this->hasMany(PayGroupComponent::class);
    }
}
