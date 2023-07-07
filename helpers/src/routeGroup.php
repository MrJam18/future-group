<?php
declare(strict_types=1);

use Illuminate\Support\Facades\Route;

function routeGroup(string $name, \Closure $callback) {
    Route::prefix($name)->name("$name/")->group($callback);
}
