<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UsuarioResource;
use App\Usuario;

class PerfilController extends Controller
{
    //
    public function index() {
        $perfil = auth()->user();
        return new UsuarioResource($perfil);
    }

    public function update(Request $request, $id) {
        $perfil = Usuario::find($id);
        if (!$perfil) {
           return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']], 404);
        }

        $perfil->fill($request->all());
        $perfil->save();
    }
}
