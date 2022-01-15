<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuario;
use App\Paciente;
use App\Agenda;

class DashboardController extends Controller
{
    public function index() {
        $qtdUsuarios = Usuario::wherePapel('P')->whereAtivo(true)->count();
        $qtdPacientes = Paciente::whereAtivo(true)->count();

        $userAuth = auth()->user();
        if ($userAuth->papel == 'P' && $userAuth->admin == 0) {
            $qtdAgendaAtendido = Agenda::whereSituacao('A')->whereUsuarioId($userAuth->id)->count();
            $qtdAgendaPendente = Agenda::whereIn('situacao',['R', 'C'])->whereUsuarioId($userAuth->id)->count();
        } else {
            $qtdAgendaAtendido = Agenda::whereSituacao('A')->count();
            $qtdAgendaPendente = Agenda::whereIn('situacao',['R', 'C'])->count();
        }

        return response()->json(
            array(
                'qtd_psicologos' => $qtdUsuarios,
                'qtd_pacientes' => $qtdPacientes,
                'qtd_agendamento_atendido' => $qtdAgendaAtendido,
                'qtd_agendamento_pendente' => $qtdAgendaPendente
            )
        );
    }
}
