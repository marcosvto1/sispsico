<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class FaturaDetalhe extends Model
{
  protected $table= 'FATURA_DETALHE';
  public $timestamps = false;
  protected $fillable = [
  	'id',
  	'descricao',
  	'valor_unitario',
  	'qtde',
  	'valor_total',
  	'fatura_id',
  ];


}
