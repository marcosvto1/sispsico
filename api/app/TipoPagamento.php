<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoPagamento extends Model
{
  protected $table= 'TIPO_PAGAMENTO';
  public $timestamps = false;
  protected $fillable = [	
  	'id',
  	'nome',
  ];


}
