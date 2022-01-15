<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{

	public function toArray($request)
	{
		return [
            "id" => $this->id,
            "nome" => $this->nome,
            "usuario" => $this->usuario,
            "papel" => $this->papel,
            "ativo" => $this->ativo,
            "logradouro" => $this->logradouro,
            "numero" => $this->numero,
            "bairro" => $this->bairro,
            "cidade" => $this->cidade,
            "email" => $this->email,
            "admin" => $this->admin
		];
	}
}
