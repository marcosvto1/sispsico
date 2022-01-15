<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Agenda;

class TesteController extends Controller
{
    //
    public function index() {
        \App\Usuario::create([
            "nome" => "Marcos Vinicius",
            "usuario" =>"marcos",
            "password" => bcrypt('123456'),
            "papel" => "A",
            "email" => "marcosvto1@gmail.com"
        ]);
    }
}
