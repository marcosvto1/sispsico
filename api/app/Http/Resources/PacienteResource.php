<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PacienteResource extends JsonResource
{

	public function toArray($request)
	{
		return [
            "id" => $this->id,
            "nome" => $this->nome,
            "telefone" => $this->telefone,
            "celular" => $this->celular,
            "responsavel" => $this->responsavel,
            "ativo" => $this->ativo,
            "cpf" => $this->cpf,
            "sexo" => $this->sexo,
		];
	}
}
