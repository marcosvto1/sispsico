<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AgendaResource extends JsonResource
{

	public function toArray($request)
	{
		return [
                  "id" => $this->id,
                  "descricao" => $this->descricao,
                  "dias_disponivel" => $this->dias_disponivel,
                  "hora_inicial" => $this->hora_inicial,
                  "hora_final" => $this->hora_final,
                  'listaAtendente' => $this->listaAtendente
		];
	}
}
