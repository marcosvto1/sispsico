<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DespesaResource extends JsonResource
{

	public function toArray($request)
	{
		return [
            "id" => $this->id,
            "descricao" => $this->descricao,
            "data_despesa" => $this->data_despesa,
            "valor" => $this->valor,
            "forma_pagamento" => $this->forma_pagamento,
            "situacao" => $this->situacao,
		];
	}
}
