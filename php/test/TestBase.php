<?php

namespace DNSBrandWatch\Test;

use Kiniauth\Bootstrap;
use Kinikit\Core\DependencyInjection\Container;
use Kinikit\Persistence\Tools\TestDataInstaller;

class TestBase extends \PHPUnit\Framework\TestCase {

    private static $run = false;

    public static function setUpBeforeClass(): void {

        $bootstrap = Container::instance()->get(Bootstrap::class);
        $bootstrap->setup();


        if (!self::$run) {

            if (!file_exists("DB")) {
                mkdir("DB");
            }

            $testDataInstaller = Container::instance()->get(TestDataInstaller::class);
            $testDataInstaller->run(true, ["../src"]);

            self::$run = true;

        }
    }

}