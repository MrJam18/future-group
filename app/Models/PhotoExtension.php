<?php
declare(strict_types=1);

namespace App\Models;



/**
 * @property int $id;
 * @property string $name;
 */
class PhotoExtension extends BaseModel
{
    protected $fillable = [
        'name'
    ];
    public $timestamps = false;
}
