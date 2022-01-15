<?php
namespace App\Http\Controllers;

use App\Http\Resources\PacienteResource;
use Illuminate\Http\Request;
use App\Paciente;
use App\Agenda;
use Validator;

class PacienteController extends Controller
{

	public function index(Request $request)
	{

        if ($request->has('paginate') && $request->paginate == 'true') {
            $listaPaciente = PacienteResource::collection(Paciente::search($request)->paginate());
        } else {
            $listaPaciente = PacienteResource::collection(Paciente::search($request)->get());
        }

		return $listaPaciente;
	}

	public function store(Request $request)
	{

        $validator = Validator::make($request->all(), [
            "nome" => "required|max:200",
            "telefone" => "max:20",
            "celular" => "max:20",
            "responsavel" => "max:200",
            "ativo" => "max:11",
            "cpf" => "max:20",
            "sexo" => "max:1"
        ]);

        if ($validator->fails()) {
            return response()
            ->json([
                'status' => 'error_requisicao',
                'mensagem' => $validator->errors()
            ], 400);
        }


		$paciente = Paciente::create($request->all());
		return new PacienteResource($paciente);
	}

	public function show($id)
	{
		$paciente = Paciente::find($id);
		if(!$paciente) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']], 404);
		}

		return new PacienteResource($paciente);
	}

	public function update(Request $request, $id)
	{
        $validator = Validator::make($request->all(), [
            "nome" => "required|max:200",
            "telefone" => "max:20",
            "celular" => "max:20",
            "responsavel" => "max:200",
            "ativo" => "max:11",
            "cpf" => "max:20",
        ]);

        if ($validator->fails()) {
            return response()
            ->json([
                'status' => 'error_requisicao',
                'mensagem' => $validator->errors()
            ], 400);
        }

        $paciente = Paciente::find($id);
        if(!$paciente) {
        return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']], 401);
        }


        $paciente->update($request->all());
        return new PacienteResource($paciente);
    }

	public function destroy($id)
	{
		$paciente = Paciente::find($id);
		if(!$paciente) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']],404);
		}
        Agenda::wherePacienteId($paciente->id)->delete();
		$paciente->delete();
		return response()->json(null, 204);
	}
}
