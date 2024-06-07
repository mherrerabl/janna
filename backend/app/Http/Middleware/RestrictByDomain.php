<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RestrictByDomain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
     {
         // Check if the request originated from the allowed domain
         if ($request->headers->get('origin') !== env('FRONTEND_URL')) {
             return response('Unauthorized.', 401);
         }

         return $next($request);
     }

}
