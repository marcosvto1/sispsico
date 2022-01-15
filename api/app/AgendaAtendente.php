<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AgendaAtendente extends Model
{
    protected $table = 'AGENDA_ATENDENTE';

    protected $fillable = [
        'id',
        'agenda_id',
        'atendente_id'
    ];

    protected $with = ['atendente'];

    public $timestamps = false;

    public function atendente() {
        return $this->belongsTo('App\Atendente');
    }
}
