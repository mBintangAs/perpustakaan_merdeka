<?php

namespace App\Http\Controllers;

use App\Exports\BooksExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
class ExportDocument extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }
    public function exportExcel()
    {
        if (auth()->user()->is_admin) {
            return Excel::download(new BooksExport(), 'books.xlsx');
        }
        return Excel::download(new BooksExport(auth()->user()->id), 'books.xlsx');
    }
}
