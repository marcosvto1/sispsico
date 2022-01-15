<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Search;

class Agendamento extends Model
{

  use Search;

  protected $table= 'AGENDAMENTO';

  protected $fillable = [
    'id',
    'data_inicio',
    'data_final',
    'situacao',
    'paciente_id',
    'usuario_id',
    'nome',
    'telefone',
    'celular',
    'responsavel',
    'agenda_id'
  ];

  public $timestamps = false;

  public function paciente(){
	return $this->belongsTo('App\Paciente');
  }

  public function usuario(){
	return $this->belongsTo('App\Usuario');
  }

}
