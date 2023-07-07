<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id;
 * @property string $name;
 */
class Company extends BaseModel
{
    protected $fillable = [
        'name'
    ];
    public $timestamps = false;

    function notes(): HasMany
    {
        return $this->hasMany();
    }
}
