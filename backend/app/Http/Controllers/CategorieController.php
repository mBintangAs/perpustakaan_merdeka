<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'is_admin'], ['except' => ['index', 'show','search']]);
    }
    public function index(Request $request)
    {
        $offset= $request->offset?$request->offset:0;
        return Categorie::limit(10)->offset($offset)->get();
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
    public function search(Request $request)
    {
        $offset = $request->offset ? $request->offset : 0;
        $searchTerm = $request->q;
        return Categorie::where('name','like', '%' . $searchTerm . '%')->limit(10)->offset($offset)->get();
    }
}
