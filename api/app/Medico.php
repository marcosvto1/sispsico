<?php

namespace App;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medico extends Model
{
    //
    use SoftDeletes;
    use Search;

    protected $table = 'MEDICO';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'usuario_id',
        'codigo',
        'contrato_trabalho_id',
        'crm',
        'especialidade',
        'ativo'
    ];

    public function contratoTrabalho() {
        return $this->belongsTo('App\ContratoTrabalho');
    }

    public function usuario() {
        return $this->belongsTo('App\Usuario');
    }
}
