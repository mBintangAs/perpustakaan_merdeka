<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ExportDocument;
use App\Http\Controllers\CategorieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('login', [AuthController::class,'login']);
Route::post('register', [AuthController::class,'register']);
Route::post('logout', [AuthController::class,'logout']);
Route::post('refresh', [AuthController::class,'refresh']);
Route::post('me', [AuthController::class,'me']);
Route::resource('/categories', CategorieController::class);
Route::resource('/books', BookController::class);
Route::get('/export/excel',[ExportDocument::class,'exportExcel']);
// Route::get('/export/pdf',[ExportDocument::class,'exportExcel']);
