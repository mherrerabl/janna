<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Controllers\Middleware\RestrictByDomain;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
         //\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
         \App\Http\Middleware\Cors::class,
         \App\Http\Middleware\RestrictByDomain::class,
        ]);

        $middleware->alias([
            //'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            'cors' => \App\Http\Middleware\Cors::class,
            'RestrictByDomain' => \App\Http\Middleware\RestrictByDomain::class
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();