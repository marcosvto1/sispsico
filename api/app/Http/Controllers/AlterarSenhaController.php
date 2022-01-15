<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuario;
use Hash;

class AlterarSenhaController extends Controller
{
    // Alterar Senha
    public function update(Request $request, $id) {
        $usuario = Usuario::find($id);
        if (!$usuario) {
           return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']], 404);
        }

        if (!Hash::check($request->senha_atual, $usuario->password)) {
            return response()->json(['status' => 'requisicao_invalida', 'mensagem' => ['Senha atual inválida']], 400);
        }

        $usuario->password = bcrypt($request->password);
        $usuario->save();
    }
}
