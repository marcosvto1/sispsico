<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AgendamentoResource extends JsonResource
{

	public function toArray($request)
	{
		return [
                  "id" => $this->id,
                  "data_inicio" => $this->data_inicio,
                  "data_final" => $this->data_final,
                  "situacao" => $this->situacao,
                  "paciente_id" => $this->paciente_id,
                  "usuario_id" => $this->usuario_id,
                  "nome" => $this->nome,
                  "telefone" => $this->telefone,
                  "celular" => $this->celular,
                  "paciente" => $this->paciente,
                  "usuario" => $this->usuario,
                  "responsavel" => $this->responsavel
		];
	}
}
