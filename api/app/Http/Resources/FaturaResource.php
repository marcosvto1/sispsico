<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FaturaResource extends JsonResource
{

	public function toArray($request)
	{
		return [
      	"id" => $this->id,
      	"data_fatura" => $this->data_fatura,
      	"data_vencimento" => $this->data_vencimento,
      	"valor_total" => $this->valor_total,
      	"desconto" => $this->desconto,
      	"valor_final" => $this->valor_final,
      	"observacao" => $this->observacao,
      	"endereco_paciente" => $this->endereco_paciente,
      	"endereco_cobranca" => $this->endereco_cobranca,
      	"email" => $this->email,
      	"situacao" => $this->situacao,
      	"paciente_id" => $this->paciente_id,
      	"lista_fatura_detalhe" => $this->lista_fatura_detalhe,
        "paciente" => $this->paciente,
         "forma_pagamento" => $this->forma_pagamento,
         "data_pagamento" => $this->data_pagamento,
         "valor_pago" => $this->valor_pago
		];
	}
}
