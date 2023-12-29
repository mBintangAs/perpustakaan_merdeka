<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
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
    public function index()
    {
        if (auth()->user()->is_admin) {
            # code...
            return Book::all();
        }
        return Book::where('user_id', auth()->user()->id)->get();
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            'categorie_id' => 'required|exists:categories,id',
            'title' => 'required|string',
            'description' => 'required|string',
            'quantity' => 'required|integer',
            'string' => 'required|string',
            'book_file' => 'required|file|mimes:pdf', // Contoh: Hanya menerima file PDF
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $validator['user_id']=auth()->user()->id;
        dd($validator);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
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
    public function update(UpdateBookRequest $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
    }
}
