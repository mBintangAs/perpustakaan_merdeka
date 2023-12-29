<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Database\Seeders\CategorieSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        User::create([
            'name'=>'john Doe',
            'email'=>'admin@example.com',
            'password'=>Hash::make('password'),
            'is_admin'=>true,
        ]);
        User::create([
            'name'=>'Lazy Fox',
            'email'=>'user@example.com',
            'password'=>Hash::make('password'),
        ]);
        $this->call(CategorieSeeder::class);
    }
}
