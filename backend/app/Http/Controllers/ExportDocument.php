<?php

namespace App\Http\Controllers;

use App\Exports\BooksExport;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
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
        return Excel::download(new BooksExport(auth()->user()->id), 'List_buku.xlsx');
    }
    public function exportPdf()
    {
        $buku = DB::table('books as b')
            ->join('users as u', 'u.id', '=', 'b.user_id')
            ->join('categories as c', 'c.id', '=', 'b.categorie_id')
            ->select('u.name as uploader','c.name','b.title','b.description','b.quantity');

        if (!auth()->user()->is_admin) {
            $buku->where('b.user_id', auth()->user()->id);
        }
        $buku= $buku->get();
        $is_admin= auth()->user()->is_admin;
        $logo_kampus_merdeka= $this->convertBase64('KMLOGO.png');
        $pdf = Pdf::loadView('list_book_pdf', compact('buku','is_admin','logo_kampus_merdeka'));
        $pdf->setOptions(['margin_top' => 0, 'margin_right' => 0, 'margin_bottom' => 0, 'margin_left' => 0]);
        return $pdf->download('list_buku.pdf');
    }
    public function convertBase64($storagePath)
    {
        // Konstruksi path lengkap ke file dalam direktori storage
        $path = storage_path("/app/public/{$storagePath}");
    
        // Membaca data dari file
        $data = file_get_contents($path);
    
        // Mendapatkan tipe file dari ekstensi
        $type = pathinfo($path, PATHINFO_EXTENSION);
    
        // Menghasilkan data URI
        return 'data:image/' . $type . ';base64,' . base64_encode($data);
    }
    

}
