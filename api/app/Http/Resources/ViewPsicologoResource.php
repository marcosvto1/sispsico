<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ViewPsicologoResource extends JsonResource
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
            'nome' => $this->nome,
            'email' => $this->email,
            'agenda_id' => $this->agenda_id,
            'psicologo_id' => $this->psicologo_id,
            'usuario_id' => $this->usuario_id,
            'admin' => $this->admin,
            'papel' => $this->papel,
            'crp' => $this->crp,
            'codigo' => $this->codigo,
            'especialidade' => $this->especialidade,

        ];
    }
}
