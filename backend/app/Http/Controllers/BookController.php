<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $offset = $request->offset ? $request->offset : 0;
        $data = DB::table('books as b')
            ->join('users as u', 'u.id', '=', 'b.user_id')
            ->join('categories as c', 'c.id', '=', 'b.categorie_id')
            ->select('b.*', 'u.name', 'c.name as category')
            ->limit(10)
            ->offset($offset)
            ->when(!$user->is_admin, function ($query) use ($user) {
                $query->where('b.user_id', $user->id);
            })
            ->get();

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            'categorie_id' => 'required|exists:categories,id',
            'title' => 'required|string|unique:books',
            'description' => 'required|string',
            'quantity' => 'required|integer',
            'cover' => 'required|image|mimes:png,jpg,jpeg|max:1024',
            'book' => 'required|file|mimes:pdf|max:10240', // Contoh: Hanya menerima file PDF
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $request['user_id'] = auth()->user()->id;
        $book_file = $request->file('book');
        $book_name = $book_file->getClientOriginalName();
        $request['book_file'] = $book_name;
        $book_file->storeAs('/books', $book_name);
        $cover_file = $request->file('cover');
        $cover_name = $cover_file->getClientOriginalName();
        $cover_file->storeAs('/cover_file', $cover_name);
        $request['cover_file'] = $cover_name;
        Book::create($request->all());
        return response()->json(['message' => 'Books Uploaded Successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $user = auth()->user();
        $data = DB::table('books as b')
            ->join('users as u', 'u.id', '=', 'b.user_id')
            ->join('categories as c', 'c.id', '=', 'b.categorie_id')
            ->select('b.*', 'u.name', 'c.name as category')
            ->when(!$user->is_admin, function ($query) use ($user) {
                $query->where('b.user_id', $user->id);
            })
            ->where('title', $id)
            ->first();

        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id)
    {
        $validator = validator($request->all(), [
            'categorie_id' => 'required|exists:categories,id',
            'title' => 'required|string',
            'description' => 'required|string',
            'quantity' => 'required|integer',
            'cover' => 'nullable|image|mimes:png,jpg,jpeg|max:1024',
            'book' => 'nullable|file|mimes:pdf|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $request['user_id'] = auth()->user()->id;
        $book = Book::find($id);
        if (!auth()->user()->is_admin && $book->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized Access'], 422);
        }
        // Hapus file buku lama jika ada file buku baru diunggah
        if ($request->hasFile('book')) {
            $this->deleteFile('/books', $book->book_file);
            $book_file = $request->file('book');
            $book_name = $book_file->getClientOriginalName();
            $request['book_file'] = $book_name;
            $book_file->storeAs('/books', $book_name);
        }

        // Hapus file cover lama jika ada file cover baru diunggah
        if ($request->hasFile('cover')) {
            $this->deleteFile('/cover_file', $book->cover_file);
            $cover_file = $request->file('cover');
            $cover_name = $cover_file->getClientOriginalName();
            $request['cover_file'] = $cover_name;
            $cover_file->storeAs('/cover_file', $cover_name);
        }

        $book->update($request->all());

        return response()->json(['message' => 'Book Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $book = Book::find($id);
        if (!auth()->user()->is_admin && $book->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized Access'], 422);
        }
        $this->deleteFile('/cover_file', $book->cover_file);
        $this->deleteFile('/books', $book->book_file);
        $book->delete();
        return response()->json(['message' => 'Book Deleted Successfully']);
    }
    // Fungsi untuk menghapus file dari storage
    private function deleteFile($directory, $fileName)
    {
        $filePath = $directory . '/' . $fileName;

        // Hapus file hanya jika file ada
        if (Storage::exists($filePath)) {
            Storage::delete($filePath);
        }
    }
    public function search(Request $request)
    {
        $offset = $request->offset ? $request->offset : 0;
        $user = auth()->user();
        $query = DB::table('books as b')
            ->join('users as u', 'u.id', '=', 'b.user_id')
            ->join('categories as c', 'c.id', '=', 'b.categorie_id')
            ->select('b.*', 'u.name', 'c.name as category');
        $searchTerm = $request->q;
        if ($request->has('type') && $request->type === 'book') {
            // Tambahkan logika pencarian di semua kolom buku
            $query->where(function ($query) use ($searchTerm) {
                $query
                    ->where('b.title', 'like', '%' . $searchTerm . '%')
                    ->orWhere('b.description', 'like', '%' . $searchTerm . '%')
                    ->orWhere('b.quantity', 'like', '%' . $searchTerm . '%')
                    ->orWhere('u.name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('c.name', 'like', '%' . $searchTerm . '%');
            });
        }
        if ($request->has('type') && $request->type === 'category') {
            // Tambahkan logika pencarian di semua kolom buku
            $query->where(function ($query) use ($searchTerm) {
                $query->Where('c.name', 'like', '%' . $searchTerm . '%');
            });
        }

        $data = $query
            ->when(!$user->is_admin, function ($query) use ($user) {
                $query->where('b.user_id', $user->id);
            })
            ->limit(10)
            ->offset($offset)
            ->get();

        return response()->json($data);
    }
    public function showCover(Request $request)
    {
        $path = storage_path('app/cover_file/' . $request->filename);
    return response()->file($path);
    }
    public function downloadBook(Request $request)
    {
        $path = storage_path('app/books/' . $request->filename);

        return response()->file($path);
    }
}
