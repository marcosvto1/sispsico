<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Search;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fatura extends Model
{

    use Search;
    use SoftDeletes;

    protected $table= 'FATURA';
    public $timestamps = false;
    protected $date = ['deleted_at'];

    protected $fillable = [
        'id',
        'data_fatura',
        'data_vencimento',
        'valor_total',
        'desconto',
        'valor_final',
        'observacao',
        'endereco_paciente',
        'endereco_cobranca',
        'email',
        'situacao',
        'paciente_id',
        'tipo_pagamento_id',
        'forma_pagamento',
        'valor_pago',
        'data_pagamento'
    ];

    public function lista_fatura_detalhe(){
        return $this->hasMany('App\FaturaDetalhe');
    }

    public function paciente(){
        return $this->belongsTo('App\Paciente');
    }


}
