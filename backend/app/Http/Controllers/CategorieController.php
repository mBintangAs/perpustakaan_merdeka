<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'is_admin'], ['except' => ['index', 'show']]);
    }
    public function index()
    {
        return Categorie::all();
    }

  

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:categories',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        return Categorie::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:categories',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $category = Categorie::find($id);
        $category->update($request->all());
        return $category;
    }

    public function destroy($id)
    {
        Categorie::destroy($id);
        return response()->json(['message' => 'Category deleted']);
    }
}
