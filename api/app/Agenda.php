<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Search;

class Agenda extends Model
{

  use Search;

  protected $table= 'AGENDA';

  protected $fillable = [
    'id',
    'hora_inicial',
    'hora_final',
    'descricao',
    'dias_disponivel',
    'ativo'
  ];

  public $timestamps = false;


  public function listaAtendente() {
    return $this->hasMany('App\AgendaAtendente');
  }


}
