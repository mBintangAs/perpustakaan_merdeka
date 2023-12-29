<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class BooksExport implements FromCollection, WithHeadings
{
    protected $id;

    public function __construct($id = null)
    {
        $this->id = $id;
    }

    public function collection()
    {
        $query = DB::table('books as b')
            ->join('users as u', 'u.id', '=', 'b.user_id')
            ->join('categories as c', 'c.id', '=', 'b.categorie_id')
            ->select('u.name as uploader','c.name','b.title','b.description','b.quantity');

        if ($this->id) {
            $query->where('b.user_id', $this->id);
        }

        return $query->get();
    }
    public function headings(): array
    {
        return [
            'Uploader',
            'Category',
            'Title',
            'Description',
            'Quantity',
        ];
    }
}
