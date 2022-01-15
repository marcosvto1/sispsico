<?php
namespace App\Http\Controllers;

use App\Http\Resources\FaturaResource;
use Illuminate\Http\Request;
use App\Fatura;
use App\FaturaDetalhe;
use Validator;


class FaturaController extends Controller
{

	public function index(Request $request)
	{

        $scopeSituacao = function($query) use ($request) {
            if ($request->has('situacao') && !empty($request->situacao)) {
                $arrExplode = explode('|', $request->situacao);
                $query->whereIn('situacao', $arrExplode);
            }
        };

        $scopeRangeData = function($query) use($request) {

            if (
                ($request->has('campo') && !empty($request->campo)) &&
                ($request->has('dataInicio') && !empty($request->dataInicio)) &&
                ($request->has('dataFinal') && !empty($request->dataFinal))
                ) {

                $inicio = \Carbon\Carbon::parse($request->dataInicio);
                $final = \Carbon\Carbon::parse($request->dataFinal);

                $query->whereBetween('data_fatura',
                    [$inicio->format('Y-m-d'), $final->format('Y-m-d')]);

            }
        };

        $scopePaciente = function($query) use ($request) {
            if ($request->has('paciente_id') && !empty($request->paciente_id)) {
                $query->where('paciente_id', $request->paciente_id);
            }
        };

        if ($request->has('paginate') && $request->paginate == 'true') {
            $listaFatura = FaturaResource::collection(
                Fatura::where($scopeSituacao)
                    ->where($scopeRangeData)
                    ->where($scopePaciente)
                    ->paginate()
                );
        } else {
            $listaFatura = FaturaResource::collection(Fatura::search($request)->get());
        }

		return $listaFatura;
	}

	public function store(Request $request)
	{

        $validator = Validator::make($request->all(), [
            "data_fatura" => "required",
            "data_vencimento" => "",
            "valor_total" => "max:162",
            "desconto" => "",
            "valor_final" => "max:162",
            "observacao" => "",
            "endereco_paciente" => "max:200",
            "endereco_cobranca" => "max:200",
            "email" => "max:200",
            "situacao" => "max:2",
            "paciente_id" => "required|max:11",
            "forma_pagamento" => "",
        ]);

        if ($validator->fails()) {
            return response()
            ->json([
                'status' => 'error_requisicao',
                'mensagem' => $validator->errors()
                ]);
        }
		$fatura = Fatura::create($request->all());

		if($request->has('lista_fatura_detalhe')) {
			$fatura->lista_fatura_detalhe()->createMany($request->lista_fatura_detalhe);
		}


		return new FaturaResource($fatura);
	}

	public function show($id)
	{
		$fatura = Fatura::find($id);
		if(!$fatura) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		return new FaturaResource($fatura);
	}

	public function update(Request $request, $id)
	{
        $validator = Validator::make($request->all(), [
            "data_fatura" => "",
            "data_vencimento" => "",
            "valor_total" => "max:162",
            "desconto" => "",
            "valor_final" => "max:162",
            "observacao" => "",
            "endereco_paciente" => "max:200",
            "endereco_cobranca" => "max:200",
            "email" => "max:200",
            "situacao" => "max:2",
            "paciente_id" => "required|max:11",
            "forma_pagamento" => "",
        ]);

        if ($validator->fails()) {
            return response()
            ->json([
                'status' => 'error_requisicao',
                'mensagem' => $validator->errors()
                ]);
        }

        $fatura = Fatura::find($id);
        if(!$fatura) {
        return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
        }

		if($request->has('lista_fatura_detalhe')) {
            $fatura->lista_fatura_detalhe()->delete();
            $fatura->lista_fatura_detalhe()->createMany($request->lista_fatura_detalhe);
		}

        $fatura->update($request->all());
        return new FaturaResource($fatura);
	}

	public function destroy($id)
	{
		$fatura = Fatura::find($id);
		if(!$fatura) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		$fatura->delete();
		return response()->json(null, 204);
    }

    public function getTotais() {
        $totalFaturaPagas =
            Fatura::select('valor_pago')
            ->whereSituacao('PR')
                ->sum('valor_pago');

        $totalFaturaPendentes =
            Fatura::select('valor_final')
            ->whereSituacao('AP')
                ->sum('valor_final');

        return response()->json([
            'totalFaturaPagas' => $totalFaturaPagas,
            'totalFaturaPendentes' => $totalFaturaPendentes
        ]);
    }
}
