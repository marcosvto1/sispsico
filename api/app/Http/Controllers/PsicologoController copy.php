<?php

namespace App\Http\Controllers;
use App\Http\Resources\UsuarioResource;
use Illuminate\Http\Request;
use App\Usuario;

class PsicologoController extends Controller
{
    //
    public function index(Request $request) {
        if ($request->has('paginate') && $request->paginate == 'true') {
            $listaUsuario = UsuarioResource::collection(Usuario::wherePapel('P')->whereAtivo(1)->search($request)->paginate());
        } else {
            $listaUsuario = UsuarioResource::collection(Usuario::wherePapel('P')->whereAtivo(1)->search($request)->get());
        }
		return $listaUsuario;
    }
}
