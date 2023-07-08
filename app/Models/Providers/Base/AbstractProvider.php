<?php
declare(strict_types=1);

namespace App\Models\Providers\Base;


use Illuminate\Database\Eloquent\Builder;

abstract class AbstractProvider
{
    protected string $model;
    protected array $defaultOrderBy;
    protected string $table;

    public function __construct(string $model, ?array $defaultOrderBy = null)
    {
        $this->table = (new $model())->getTable();
        $this->model = $model;
        $this->defaultOrderBy = $defaultOrderBy;
    }


    protected function getOrdered(?array $orderBy = null): Builder
    {
        if(!$orderBy) $orderBy = $this->defaultOrderBy;
        return $this->query()->orderBy($orderBy['column'], $orderBy['direction']);
    }


    /** @noinspection PhpUndefinedMethodInspection */
    protected function query(): Builder
    {
        return $this->model::query();
    }

}
