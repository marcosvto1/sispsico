<?php
namespace App\Services;

use Comtele\Services\TextMessageService;

class ComteleService {
    function sendSMS() {
       $apiKey = env('API_KEY_COMTELE');
        if (!empty($apiKey)) {
            $textMessageService = new TextMessageService($apiKey);
            $content = 'Sua fatura (02221) chegou por favor pague agora';
            $result = $textMessageService->send("SISPSICO", $content ,
            ["6284676199","64981032859"]);
            dd($result);
        }
    }
}
