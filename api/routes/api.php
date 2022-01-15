<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// jwt.auth

Route::group(['middleware' => ['jwt.auth']], function() {
    Route::get('dashboard', 'DashboardController@index');
    Route::post('logout', 'ApiAutenticacaoController@logout');
    Route::resource('agendamento', 'AgendamentoController');
    Route::resource('agenda', 'AgendaController');
    Route::resource('atendente', 'AtendenteController');
    Route::resource('psicologo', 'PsicologoController');
    Route::resource('medico', 'MedicoController');
    Route::resource('contrato_trabalho', 'ContratoTrabalhoController');


    Route::resource('usuario', 'UsuarioController');
    Route::resource('perfil', 'PerfilController');
    Route::resource('alterar_senha', 'AlterarSenhaController');
    Route::resource('psicologo', 'PsicologoController');

    Route::resource('despesa', 'DespesaController');

    // Views Usuários
    Route::get('view_usuario_atendente', 'ViewUsuarioAtendenteController@index');
    Route::get('view_usuario_psicologo', 'ViewUsuarioPsicologoController@index');

    Route::get('agenda_usuario/{id}', 'AgendaUsuarioController@show');


});
Route::get('fatura/totais', 'FaturaController@getTotais');
Route::resource('fatura', 'FaturaController');

Route::resource('paciente', 'PacienteController');
Route::post('enviarSMS', 'EnviarSmsController@handle');
Route::post('login', 'ApiAutenticacaoController@login');

Route::get('teste', 'TesteController@index');
