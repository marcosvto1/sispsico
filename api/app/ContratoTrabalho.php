<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContratoTrabalho extends Model
{
    use SoftDeletes;

    protected $table = 'CONTRATO_TRABALHO';
    public $timestamps = false;

    protected $fillable = [
      'id', 'data_admissao', 'data_demissao', 'data_cadastro', 'matricula',
      'ctps_numero', 'ctps_serie', 'ctps_data_expedicao', 'ctps_uf', 'observacao'
    ];


}
