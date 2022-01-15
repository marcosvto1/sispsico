<?php
namespace App\Http\Controllers;

use App\Http\Resources\AgendamentoResource;
use Illuminate\Http\Request;
use App\Agendamento;
use Validator;

class AgendamentoController extends Controller
{

	public function index(Request $request)
	{
        $userAuth = auth()->user();
        if ($userAuth->papel == 'P' && $userAuth->admin == 0) {
            $listaAgendamento = AgendamentoResource::collection(Agendamento::search($request)->get());
        } else {
            $listaAgendamento = AgendamentoResource::collection(Agendamento::get());
        }

		return $listaAgendamento;
	}

	public function store(Request $request)
	{

        $validator = Validator::make($request->all(), [
            "situacao" => "max:4",
            "paciente_id" => "max:11",
            "usuario_id" => "required|max:11",
            "nome" => "max:100",
            "telefone" => "max:20",
            "celular" => "max:20",
            "responsavel" => "max:100"
        ]);

        if ($validator->fails()) {
            return response()
            ->json([
                'status' => 'error_requisicao',
                'mensagem' => $validator->errors()
                ]);
        }

		// Construir a data inicio
		$dataInicio = \Carbon\Carbon::parse($request->data_inicio);
        $dataInicio->setHours($request->hora_inicio);
        $dataInicio->setMinutes($request->min_inicio);
		// Construir a data final
		$dataFinal = \Carbon\Carbon::parse($request->data_final);
		$dataFinal->setHours($request->hora_final);
		$dataFinal->setMinutes($request->min_final);

		$dadosAgendamento = [
			'data_inicio' => $dataInicio->toDateTimeString(),
			'data_final' => $dataFinal->toDateTimeString(),
			'paciente_id' => $request->paciente_id,
			'usuario_id' => $request->usuario_id,
			'nome' => $request->nome,
			'telefone' => $request->telefone,
			'celular' => $request->celular,
			'situacao' => $request->situacao == null ? 'R' : $request->situacao,
        ];
        $Agendamento = Agendamento::create($dadosAgendamento);

        if (($request->paciente_id == null || $request->paciente_id == '') && $request->situacao == 'C' ) {
            $Agendamento->paciente()->create([
              'nome' => $request->nome,
              'responsavel' => $request->responsavel,
              'cpf' => null,
              'telefone' => $request->telefone,
              'celular' => $request->celular,
              'ativo' => 1
            ]);
        }


		return new AgendamentoResource($Agendamento);
	}

	public function show($id)
	{
		$Agendamento = Agendamento::find($id);
		if(!$Agendamento) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		return new AgendamentoResource($Agendamento);
	}

	public function update(Request $request, $id)
	{
        $validator = Validator::make($request->all(), [
            "situacao" => "max:4",
            "paciente_id" => "max:11",
            "usuario_id" => "required|max:11",
            "nome" => "max:100",
            "telefone" => "max:20",
            "celular" => "max:20",
            "responsavel" => "max:100"
        ]);

        if ($validator->fails()) {
            return response()
            ->json([
                'status' => 'error_requisicao',
                'mensagem' => $validator->errors()
                ]);
        }

        $Agendamento = Agendamento::find($id);
        if(!$Agendamento) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }

        if (($request->paciente_id == null || $request->paciente_id == '') && $request->situacao == 'C' ) {
          $Agendamento->paciente()->create([
            'nome' => $request->nome,
            'responsavel' => $request->responsavel,
            'cpf' => null,
            'telefone' => $request->telefone,
            'celular' => $request->celular,
            'ativo' => 1
          ]);
        }

		$Agendamento->update($request->all());
        return new AgendamentoResource($Agendamento);
	}

	public function destroy($id)
	{
		$Agendamento = Agendamento::find($id);
		if(!$Agendamento) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		$Agendamento->delete();
		return response()->json(null, 204);
	}
}
