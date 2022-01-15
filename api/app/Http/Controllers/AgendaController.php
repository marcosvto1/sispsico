<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\AgendaResource;
use App\Agenda;
use App\Psicologo;
use App\Medico;
use App\AgendaAtendente;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $arr = array_map(function($item) {
           return $item['id'];
        }, $request->dias_disponivel);
        
        $usuario = null;
        if (auth()->user()->papel == 'P') {
            $usuario = Psicologo::whereUsuarioId(auth()->user()->id)->first();
        } else if (auth()->user()->papel == 'M') {
            $usuario = Medico::whereUsuarioId(auth()->user()->id)->first();
        }
        if ($usuario == null) {
            return response()->json(['mensagem' => ['Não foi possivel registrar a agenda']], 500);
        }

        $dias_disponivel = implode(',', $arr);
        
        $agenda = new Agenda();
        $agenda->fill($request->all());
        $agenda->dias_disponivel = $dias_disponivel;
        $agenda->save();

        if ($request->has('listaAtendente')) {
            foreach($request->listaAtendente as $atendente_id) {
                $agenda_atendente = AgendaAtendente::create([
                    'agenda_id' => $agenda->id,
                    'atendente_id' => $atendente_id
                ]);
            }
        }

        $usuario->agenda_id = $agenda->id;
        $usuario->save();

        return response()->json(new AgendaResource($agenda));
       

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
		$agenda = Agenda::find($id);
		if(!$agenda) {
			return response()->json([ 'status' => 'regitro_nao_encontrado', 'mensagem' => ['Registro não encontrado']]);
		}

		return new AgendaResource($agenda);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
   
         $dias_disponivel = implode(',', $request->dias_disponivel);
        
         $agenda = Agenda::find($id);
         $agenda->fill($request->all());
         $agenda->dias_disponivel = $dias_disponivel;
         $agenda->save();

         if ($request->has('listaAtendente')) {
            $agenda->listaAtendente()->delete();
            foreach($request->listaAtendente as $atendente_id) {
                $agenda_atendente = AgendaAtendente::create([
                    'agenda_id' => $agenda->id,
                    'atendente_id' => $atendente_id
                ]);
            }
         }
 
         return response()->json(new AgendaResource($agenda));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
