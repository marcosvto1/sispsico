<?php

namespace App\Http\Controllers;

use App\Atendente;
use App\ContratoTrabalho;
use App\Http\Resources\AtendenteResource;
use Illuminate\Http\Request;
use Validator;

class AtendenteController extends Controller
{
    public function index(Request $request)
    {
        $listaAtendente = AtendenteResource::collection(Atendente::search($request)->get());
        return $listaAtendente;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'codigo' => 'required'
        ]);

        if ($validator->fails()) {
            return response()
                ->json([
                    'status' => 'error_requisicao',
                    'mensagem' => $validator->errors()
                ]);
        }

        $atendente = Atendente::create($request->all());

        $contrato_trabalho = new ContratoTrabalho();
        $contrato_trabalho->fill($request->contrato_trabalho);
        $contrato_trabalho->save();

        $atendente->contrato_trabalho_id = $contrato_trabalho->id;
        $atendente->save();


        return new AtendenteResource($atendente);
    }

    public function show($id)
    {
        $atendente = Atendente::find($id);
        if(!$atendente) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }

        return new AtendenteResource($atendente);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'codigo' => 'required'
        ]);

        if ($validator->fails()) {
            return response()
                ->json([
                    'status' => 'error_requisicao',
                    'mensagem' => $validator->errors()
                ]);
        }

        $atendente = Atendente::find($id);
        if(!$atendente) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }

        $atendente->update($request->all());
        $atendente->contratoTrabalho()->update($request->contrato_trabalho);
        return new AtendenteResource($atendente);
    }

    public function destroy($id)
    {
        $atendente = Atendente::find($id);
        if(!$atendente) {
            return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }
        $atendente->contratoTrabalho()->delete();
        $atendente->delete();
        return response()->json(null, 204);
    }
}
