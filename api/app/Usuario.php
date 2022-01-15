<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Traits\Search;
use Illuminate\Database\Eloquent\SoftDeletes;

class Usuario extends Authenticatable implements JWTSubject
{
  use Search;
  use SoftDeletes;

  protected $table= 'USUARIO';

  protected $fillable = [
    'id',
    'nome',
    'email',
    'usuario',
    'password',
    'logradouro',
    'papel',
    'numero',
    'bairro',
    'cidade',
    'ativo',
    'admin',
  ];

  public $timestamps = false;
  protected $date = ['deleted_at'];

  /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
  */
  protected $hidden = [
      'password'
  ];


  public function getJWTIdentifier()
  {
    return $this->getKey();
  }

  public function getJWTCustomClaims()
  {
    return [];
  }

}
