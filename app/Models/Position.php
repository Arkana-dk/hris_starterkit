<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'level',
    ];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function sections(): BelongsToMany
    {
        return $this->belongsToMany(Section::class, 'position_section');
    }
}
