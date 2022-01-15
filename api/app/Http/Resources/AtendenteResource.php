<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AtendenteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'usuario' => $this->usuario,
            'contrato_trabalho' => $this->contratoTrabalho,
            'usuario_id' => $this->usuario_id,
            'contrato_trabalho_id' => $this->contrato_trabalho_id,
        ];
    }
}
