<?php

namespace App;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Model;

class Atendente extends Model
{

    use Search;
    protected $table = 'ATENDENTE';
    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'codigo',
        'contrato_trabalho_id',
        'ativo'
    ];

    protected $with = ['usuario'];

    public function contratoTrabalho() {
        return $this->belongsTo('App\ContratoTrabalho');
    }

    public function usuario() {
        return $this->belongsTo('App\Usuario');
    }
}
