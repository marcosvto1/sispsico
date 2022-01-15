<?php

namespace App\Http\Controllers;

use App\Http\Resources\AgendaResource;
use Illuminate\Http\Request;
use App\Psicologo;
use App\Medico;

class AgendaUsuarioController extends Controller
{
    //
    public function show($id) {

        $usuario = auth()->user();
       
        if ($id != $usuario->id) {
            return response()->json(['menssagem' => ['Não foi possível encontrar agenda']]);
        }

        if ($usuario->papel == 'P') {
            $usuarioPsicologo = Psicologo::whereUsuarioId($id)->first();
            
            if ($usuarioPsicologo->agenda_id == null || empty($usuarioPsicologo->agenda_id)) {
                return response()->json(null);
            }

            return response()->json(new AgendaResource($usuarioPsicologo->agenda));
        } else {
            $usuarioMedico = Medico::whereUsuarioId($id)->first();
            
            if ($usuarioMedico->agenda_id == null || empty($usuarioMedico->agenda_id)) {
                return response()->json([]);
            }

             return response()->json(new AgendaResource($usuarioMedico->agenda));

        }

        return null;
    }
}
