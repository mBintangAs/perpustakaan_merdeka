<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 10000; $i++) { 
            # code...
            Book::create([
                'categorie_id'=>1,
                'user_id'=>1,
                'title'=> "lorem ipsum ".$i,
                'description'=> "
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime omnis exercitationem nemo dolorum facere quisquam fuga sit quidem id reiciendis consequatur ipsa, sapiente placeat culpa velit dicta perferendis? A, recusandae.
                ",
                'quantity'=>rand(1,100),
                'book_file'=>"fileeee",
                'cover_file'=>"fileeee",
            ]);
        }
    }
}
