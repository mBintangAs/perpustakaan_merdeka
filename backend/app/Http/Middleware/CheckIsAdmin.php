<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
            // Mendapatkan informasi pengguna dari token JWT
            $user = auth()->user();

            // Memeriksa apakah pengguna memiliki peran sebagai admin
            if ($user && $user->is_admin) {
                return $next($request);
            }
    
            // Jika tidak memiliki peran sebagai admin, kembalikan respons tidak diizinkan
            return response()->json(['error' => 'Unauthorized. Admin access required.'], 403);
        
    }
}
