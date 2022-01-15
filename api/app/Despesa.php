<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Search;

class Despesa extends Model
{
  use Search;
  protected $table= 'DESPESA';
  public $timestamps = false;
  protected $fillable = [
  	'id',
  	'descricao',
  	'data_despesa',
  	'valor',
  	'forma_pagamento',
    'situacao',
    'tipo_pagamento'
  ];


}
