<?php
declare(strict_types=1);

namespace App\Models;



use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BaseModel
 *
 * @mixin Builder
 * @method static Builder|BaseModel newModelQuery()
 * @method static Builder|BaseModel newQuery()
 * @method static Builder|BaseModel query()
 * @method static self first(string[] $columns = ['*'])
 * @method static Collection all(string[] $columns = ['*'])
 */
class BaseModel extends Model
{

}
