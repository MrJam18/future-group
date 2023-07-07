<?php
declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;

/**
 * @property int $id;
 * @property Carbon $created_at;
 * @property Carbon $updated_at;
 * @property string $surname;
 * @property string $name;
 * @property string $patronymic;
 * @property string $phone;
 * @property string $email;
 * @property Carbon|null $birth_date;
 * @property string|null $photo_name;
 * @property
 */
class Note extends BaseModel
{
    protected $fillable = [
        
    ];
    public $timestamps = true;
}
