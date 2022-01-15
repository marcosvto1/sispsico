<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PsicologoResource extends JsonResource
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
            'crp' => $this->crp,
            'codigo' => $this->codigo,
            'especialidade' => $this->especialidade,
            'usuario' => $this->usuario,
            'contrato_trabalho' => $this->contratoTrabalho,
            'agenda' => $this->agenda,
            'usuario_id' => $this->usuario_id,
            'contrato_trabalho_id' => $this->contrato_trabalho_id,
        ];
    }
}
