<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\PhotoExtension;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $model = new PhotoExtension();
        $model->name = 'jpg';
        $model->save();
        $model = new PhotoExtension();
        $model->name = 'pdf';
        $model->save();
        $model = new PhotoExtension();
        $model->name = 'png';
        $model->save();
    }
}
