<?php

namespace DNSBrandWatch\Services\Util;

use Kiniauth\Services\Application\SettingsService;

class DAPAPI extends \DAP\API\DAPAPI {
    
    /**
     * DAPAPI constructor.
     *
     * @param SettingsService $settingsService
     */
    public function __construct($settingsService) {

        // Grab all settings
        $settings = $settingsService->getParentAccountSettingValues();
        parent::__construct($settings["dapLiveApiKey"], $settings["dapLiveApiSecret"], $settings["dapLiveEndpoint"]);
    }
}