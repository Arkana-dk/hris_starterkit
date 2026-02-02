<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PayGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'pay_frequency',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function payComponents(): HasMany
    {
        return $this->hasMany(PayGroupComponent::class);
    }

    public function payRuns(): HasMany
    {
        return $this->hasMany(PayRun::class);
    }
}
