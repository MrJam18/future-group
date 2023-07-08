<?php

use App\Http\Controllers\NoteBookController;

use Illuminate\Support\Facades\Route;


Route::prefix('v1/notebook')->group(function () {
    Route::get('/', [NoteBookController::class, 'getList']);
    Route::post('/', [NoteBookController::class, 'create']);
    Route::get('/{note}', [NoteBookController::class, 'getOne']);
    Route::post('/{note}', [NoteBookController::class, 'update']);
    Route::delete('/{note}', [NoteBookController::class, 'delete']);
});