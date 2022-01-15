<?php
namespace App\Http\Controllers;

use App\Http\Resources\UsuarioResource;
use Illuminate\Http\Request;
use App\Usuario;
use Validator;

class UsuarioController extends Controller
{

	public function index(Request $request)
	{
        if ($request->has('paginate') && $request->paginate == 'true') {
            $listaUsuario = UsuarioResource::collection(Usuario::search($request)->paginate());
        } else {
            $listaUsuario = UsuarioResource::collection(Usuario::search($request)->get());
        }

		return $listaUsuario;
	}

	public function store(Request $request)
	{

        $validator = Validator::make($request->all(), [
            "nome" => "required|max:200",
            "usuario" => "required|max:100|unique:USUARIO",
            "password" => "required|max:250",
            "papel" => "max:1",
            "ativo" => "max:11",
            "logradouro" => "max:200",
            "numero" => "max:10",
            "bairro" => "max:100",
            "cidade" => "max:100",
            "email" => "max:150|unique:USUARIO",
        ]);

        if ($validator->fails()) {
            return response()
            ->json([
                'status' => 'error_requisicao',
                'mensagem' => $validator->errors()
                ]);
        }

        $request->merge(['password' => bcrypt($request->password)]);

		$usuario = Usuario::create($request->all());
		return new UsuarioResource($usuario);
	}

	public function show($id)
	{
		$usuario = Usuario::find($id);
		if(!$usuario) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		return new UsuarioResource($usuario);
	}

	public function update(Request $request, $id)
	{
    $validator = Validator::make($request->all(), [
    	"nome" => "required|max:200",
    	"usuario" => "required|max:100|unique:USUARIO,USUARIO,$id",
    	"password" => "required|max:250",
    	"papel" => "max:1",
    	"ativo" => "max:11",
    	"logradouro" => "max:200",
    	"numero" => "max:10",
    	"bairro" => "max:100",
    	"cidade" => "max:100",
    	"email" => "max:150|unique:USUARIO,EMAIL,$id",
    ]);

    if ($validator->fails()) {
        return response()
        ->json([
            'status' => 'error_requisicao',
            'mensagem' => $validator->errors()
            ]);
    }

    $usuario = Usuario::find($id);
    if(!$usuario) {
      return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
    }

    $request->merge(['password' => bcrypt($request->password)]);

    $usuario->update($request->all());
    return new UsuarioResource($usuario);
	}

	public function destroy($id)
	{
		$usuario = Usuario::find($id);
		if(!$usuario) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		$usuario->delete();
		return response()->json(null, 204);
	}
}
