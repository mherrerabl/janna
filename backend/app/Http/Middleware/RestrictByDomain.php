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
         if ($request->headers->get('origin') !== 'https://janna-estetica.netlify.app' &&
            $request->headers->get('origin') !== 'http://janna-estetica.netlify.app' &&
            $request->headers->get('origin') !== 'http://127.0.0.1:8080' &&
            $request->headers->get('origin') !== 'http://localhost:8000' &&
            $request->headers->get('origin') !== 'http://localhost:4200') {
             return response($request->headers->get('origin'), 401);
         }

         return $next($request);
     }

}
