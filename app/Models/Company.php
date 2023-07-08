<?php
declare(strict_types=1);

namespace App\Models;

use App\Models\Traits\RusTimeStamps;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Collection\Collection;

/**
 * @property int $id;
 * @property string $name;
 * @property Collection $notes;
 */
class Company extends BaseModel
{
    protected $fillable = [
        'name'
    ];
    public $timestamps = false;

    function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}
