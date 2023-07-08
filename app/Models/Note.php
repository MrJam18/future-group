<?php
declare(strict_types=1);

namespace App\Models;

use App\Casts\UcFirst;
use App\Models\Traits\RusTimeStamps;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
 * @property Company|null $company;
 * @property PhotoExtension|null $photoExtension;
 */
class Note extends BaseModel
{
    protected $fillable = [
        'surname',
        'name',
        'patronymic',
        'phone',
        'email',
        'birth_date',
    ];
    public $timestamps = true;

    protected $casts = [
        'birth_date' => RUS_DATE_CAST,
        'surname' => UcFirst::class,
        'name' => UcFirst::class,
        'patronymic' => UcFirst::class,
        'created_at' => RUS_DATE_TIME_CAST,
        'updated_at' => RUS_DATE_TIME_CAST
    ];

    function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
    function photoExtension(): BelongsTo
    {
        return $this->belongsTo(PhotoExtension::class);
    }
}
