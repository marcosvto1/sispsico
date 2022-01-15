<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsuarioResource;
use App\Usuario;
use Illuminate\Http\Request;

class ViewUsuarioPsicologoController extends Controller
{
    public function index(Request $request) {
        if ($request->has('paginate') && $request->paginate == 'true') {
            $listaUsuario = UsuarioResource::collection(Usuario::search($request)->wherePapel('P')->whereAtivo(1)->paginate());
        } else {
            $listaUsuario = UsuarioResource::collection(Usuario::search($request)->wherePapel('P')->whereAtivo(1)->get());
        }

        return $listaUsuario;
    }
}
