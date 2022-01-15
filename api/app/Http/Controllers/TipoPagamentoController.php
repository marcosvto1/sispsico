<?php
namespace App\Http\Controllers;

use App\Http\Resources\TipoPagamentoResource;
use Illuminate\Http\Request;
use App\TipoPagamento;
use Validator;

class TipoPagamentoController extends Controller
{
  
	public function index(Request $request)
	{
		$listaTipoPagamento = TipoPagamentoResource::collection(TipoPagamento::paginate());
		return $listaTipoPagamento;
	}

	public function store(Request $request)
	{

    $validator = Validator::make($request->all(), [
    	"nome" => "max:100",
    ]);

    if ($validator->fails()) {
        return response()
        ->json([
            'status' => 'error_requisicao',
            'mensagem' => $validator->errors()
            ]);
    }
        
    $tipoPagamento = TipoPagamento::create($request->all());


	    return new TipoPagamentoResource($tipoPagamento);
	}

	public function show($id)
	{
		$tipoPagamento = TipoPagamento::find($id);
		if(!$tipoPagamento) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		return new TipoPagamentoResource($tipoPagamento);
	}

	public function update(Request $request, $id)
	{
    $validator = Validator::make($request->all(), [
    	"nome" => "max:100",
    ]);

    if ($validator->fails()) {
        return response()
        ->json([
            'status' => 'error_requisicao',
            'mensagem' => $validator->errors()
            ]);
    }

    $tipoPagamento = TipoPagamento::find($id);
    if(!$tipoPagamento) {
    return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
    }

    
    $tipoPagamento->update($request->all());
    return new TipoPagamentoResource($tipoPagamento);
	}

	public function destroy($id)
	{
		$tipoPagamento = TipoPagamento::find($id);
		if(!$tipoPagamento) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		$tipoPagamento->delete();
		return response()->json(null, 204);
	}
}
