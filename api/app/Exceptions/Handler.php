<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

use Exception;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Auth\Access\AuthorizationException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {

        if ($exception instanceof ModelNotFoundException && $request->wantsJson()) {
            return response()->json([
              'error' => 'Resource not found'
            ], 404);
        }

        if ($exception instanceof UnauthorizedHttpException) {
            // detect previous instance
            if ($exception->getPrevious() instanceof TokenExpiredException) {
                return response()->json(['status' => 'token_expired'], $exception->getStatusCode());
            }
            else if ($exception->getPrevious() instanceof TokenInvalidException) {
                return response()->json(['status' => 'token_invalid'], $exception->getStatusCode());
            }
            else if ($exception->getPrevious() instanceof TokenBlacklistedException) {
                return response()->json(['status' => 'token_blacklisted'], $exception->getStatusCode());
            } else {
                return response()->json(['status' => 'token_not_found'], $exception->getStatusCode());
            }

        }

        if ($exception instanceof AuthorizationException ) {
            return response()->json(['status' => 'ação não autorizada'], 403);
        }

        return parent::render($request, $exception);
    }
}
