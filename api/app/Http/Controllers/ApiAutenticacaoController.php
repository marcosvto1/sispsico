<?php

namespace App\Http\Controllers;
use App\Http\Resources\UsuarioResource;
use App\Http\Resources\ViewMedicoResource;
use App\Http\Resources\ViewPsicologoResource;

use App\ViewUsuarioPsicologo;
use App\ViewUsuarioMedico;

use Illuminate\Http\Request;
use Auth;
use Hash;
use Str;
use Validator;

class ApiAutenticacaoController extends Controller
{

    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'usuario' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()
                ->json([
                    'status' => 'erro_requisicao',
                    'mensagem' => $validator->errors()
                ], 400);
        }

        if (!$token = auth()->attempt(['usuario' => $request->usuario, 'password' => $request->password])){
            return response()->json([
                'status' => 'nao_autorizado',
                'mensagem' => ['Acesso não autorizado']
            ], 400);
        }

        return $this->respondWithToken($token);
    }

    public function logout() {
        auth()->logout();
        return response()
            ->json([
                'status' => 'logout',
                'mensagem' => 'Logout realizado com sucesso'
            ]);
    }

    public function permissoes() {
        return response()->json(auth()->user()->papel_usuario->papel_funcao->map(function($item) {
            return $item->funcao_papel->nome;
        }));
    }

    public function user() {
        $papel = auth()->user()->papel;
        if ($papel == 'P') {
            $viewUsuarioPsicologo = ViewUsuarioPsicologo::whereUsuarioId(auth()->user()->id)->first();
            return response()->json($viewUsuarioPsicologo);
        } else if ($papel == 'M'){
            $viewUsuarioPsicologo = ViewUsuarioMedico::whereUsuarioId(auth()->user()->id)->first();
            return response()->json(new ViewMedicoResource($viewUsuarioPsicologo));
        }
        return response()->json(new UsuarioResource(auth()->user()));
    }

    protected function respondWithToken($token)
    {
        $nome = "ADMINISTRADOR";

        if (auth()->user()) {
            $nome = auth()->user()->nome;
        }

        return response()->json([
            'access_token' => $token,
            'user' => $this->user(),
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
