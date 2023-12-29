<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categories = [
            ['name' => 'Fiction'],
            ['name' => 'Non-Fiction'],
            ['name' => 'Science Fiction'],
            ['name' => 'Mystery'],
            ['name' => 'Fantasy'],
            ['name' => 'Romance'],
            ['name' => 'History'],
            ['name' => 'Biography'],
            ['name' => 'Thriller'],
            ['name' => 'Self-Help'],
            ['name' => 'Cooking'],
            ['name' => 'Travel'],
            ['name' => 'Business'],
            ['name' => 'Art'],
            ['name' => 'Science'],
            ['name' => 'Philosophy'],
            ['name' => 'Poetry'],
            ['name' => 'Technology'],
            ['name' => 'Health'],
        ];

        foreach ($categories as $category) {
            Categorie::create($category);
        }}
}
