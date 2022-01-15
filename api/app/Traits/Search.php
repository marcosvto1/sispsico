<?php
namespace App\Traits;

trait Search {
    public function scopeSearch($query, $request) {
        if ($request->has('filter')) {
            $arrayFilter = explode('||', $request->filter);
            $field = $arrayFilter[0];
            $comparator = $arrayFilter[1];
            $value = $arrayFilter[2];

            if ($value != '') {
                if ($comparator == '$cont') {
                    $query->where($field, 'like', "%$value%");
                }
            }
        }
    }
}
