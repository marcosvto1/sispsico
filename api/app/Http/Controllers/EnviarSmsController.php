<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Services\ComteleService;

class EnviarSmsController extends Controller
{
    function handle() {
        $service = new ComteleService();

        $service->sendSMS();
    }
}
