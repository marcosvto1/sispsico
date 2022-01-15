<?php
namespace App\Http\Controllers;

use App\Http\Resources\DespesaResource;
use Illuminate\Http\Request;
use App\Despesa;
use Validator;

class DespesaController extends Controller
{

	public function index(Request $request)
	{
		$listaDespesa = DespesaResource::collection(Despesa::search($request)->get());
		return $listaDespesa;
	}

	public function store(Request $request)
	{

        $validator = Validator::make($request->all(), [
            "descricao" => "max:150|required",
            "data_despesa" => "required",
            "valor" => "max:162|required",
            "forma_pagamento" => "max:45",
            "situacao" => "max:45",
        ]);

        if ($validator->fails()) {
            return response()
            ->json([
                'status' => 'error_requisicao',
                'mensagem' => $validator->errors()
                ]);
        }

        $despesa = Despesa::create($request->all());


	    return new DespesaResource($despesa);
	}

	public function show($id)
	{
		$despesa = Despesa::find($id);
		if(!$despesa) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		return new DespesaResource($despesa);
	}

	public function update(Request $request, $id)
	{
        $validator = Validator::make($request->all(), [
            "descricao" => "max:150|required",
            "data_despesa" => "",
            "valor" => "max:162",
            "forma_pagamento" => "max:45",
            "situacao" => "max:45",
        ]);

        if ($validator->fails()) {
            return response()
            ->json([
                'status' => 'error_requisicao',
                'mensagem' => $validator->errors()
                ]);
        }

        $despesa = Despesa::find($id);
        if(!$despesa) {
        return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }


        $despesa->update($request->all());
        return new DespesaResource($despesa);
	}

	public function destroy($id)
	{
		$despesa = Despesa::find($id);
		if(!$despesa) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		$despesa->delete();
		return response()->json(null, 204);
	}
}
