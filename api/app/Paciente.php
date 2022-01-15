<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Search;
use Illuminate\Database\Eloquent\SoftDeletes;


class Paciente extends Model
{

  use Search;
  use SoftDeletes;

  protected $table= 'PACIENTE';

  protected $fillable= [
    'id',
    'nome',
    'telefone',
    'celular',
    'responsavel',
    'cpf',
    'ativo',
    'sexo'
  ];

  public $timestamps = false;
  protected $date = ['deleted_at'];

}
