<?php

namespace App\Http\Controllers;

use App\ContratoTrabalho;
use App\Http\Resources\MedicoResource;
use App\Medico;
use Illuminate\Http\Request;
use Validator;

class MedicoController extends Controller
{
    public function index(Request $request)
    {
        $listaMedico = MedicoResource::collection(Medico::search($request)->get());
        return $listaMedico;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'crm' => 'required',
            'agenda.descricao' => 'required',
        ]);

        if ($validator->fails()) {
            return response()
                ->json([
                    'status' => 'error_requisicao',
                    'mensagem' => $validator->errors()
                ]);
        }

        $contrato_trabalho = new ContratoTrabalho();
        $contrato_trabalho->fill($request->contrato_trabalho);
        $contrato_trabalho->save();

        $agenda = new Agenda();
        $agenda->fill($request->agenda);
        $agenda->save();

        $psicologo = new Medico();
        $psicologo->fill($request->all());
        $psicologo->contrato_trabalho_id = $contrato_trabalho->id;
        $psicologo->agenda_id = $agenda->id;
        $psicologo->save();


        return new MedicoResource($psicologo);
    }

    public function show($id)
    {
        $psicologo = Medico::find($id);
        if(!$psicologo) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }

        return new MedicoResource($psicologo);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'crm' => 'required',
            'agenda.descricao' => 'required',
            'contrato_trabalho.matricula' => 'max:10'
        ]);

        if ($validator->fails()) {
            return response()
                ->json([
                    'status' => 'error_requisicao',
                    'mensagem' => $validator->errors()
                ]);
        }

        $psicologo = Medico::find($id);
        if(!$psicologo) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }

        $psicologo->update($request->all());
        $psicologo->contratoTrabalho()->update($request->contrato_trabalho);
        $psicologo->agenda()->update($request->agenda);
        return new MedicoResource($psicologo);
    }

    public function destroy($id)
    {
        $psicologo = Medico::find($id);
        if(!$psicologo) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }
        $psicologo->contratoTrabalho()->delete();
        $psicologo->delete();
        return response()->json(null, 204);
    }
}
