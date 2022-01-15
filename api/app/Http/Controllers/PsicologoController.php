<?php

namespace App\Http\Controllers;

use App\Agenda;
use App\Psicologo;
use App\ContratoTrabalho;
use App\Http\Resources\PsicologoResource;
use Illuminate\Http\Request;
use Validator;

class PsicologoController extends Controller
{
    public function index(Request $request)
    {
        $listaPsicologo = PsicologoResource::collection(Psicologo::search($request)->get());
        return $listaPsicologo;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'crp' => 'required',
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

        //$agenda = new Agenda();
        //$agenda->fill($request->agenda);
        //$agenda->save();

        $psicologo = new Psicologo();
        $psicologo->fill($request->all());
        $psicologo->contrato_trabalho_id = $contrato_trabalho->id;
        $psicologo->save();


        return new PsicologoResource($psicologo);
    }

    public function show($id)
    {
        $psicologo = Psicologo::find($id);
        if(!$psicologo) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }

        return new PsicologoResource($psicologo);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'cfp' => 'required',
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

        $psicologo = Psicologo::find($id);
        if(!$psicologo) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }

        $psicologo->update($request->all());
        $psicologo->contratoTrabalho()->update($request->contrato_trabalho);
        $psicologo->agenda()->update($request->agenda);
        return new PsicologoResource($psicologo);
    }

    public function destroy($id)
    {
        $psicologo = Psicologo::find($id);
        if(!$psicologo) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }
        $psicologo->contratoTrabalho()->delete();
        $psicologo->delete();
        return response()->json(null, 204);
    }
}
