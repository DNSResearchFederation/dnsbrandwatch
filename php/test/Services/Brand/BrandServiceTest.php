<?php

namespace DNSBrandWatch\Test\Services\Brand;

use DAP\API\Services\DatasourceService;
use DNSBrandWatch\Objects\Brand\Brand;
use DNSBrandWatch\Services\Brand\BrandService;
use DNSBrandWatch\Services\Util\DAPAPI;
use DNSBrandWatch\Test\TestBase;
use Kiniauth\Test\Services\Security\AuthenticationHelper;
use Kinikit\Core\Testing\MockObject;
use Kinikit\Core\Testing\MockObjectProvider;

include_once "autoloader.php";

class BrandServiceTest extends TestBase {

    /**
     * @var BrandService
     */
    private $brandService;

    /**
     * @var MockObject
     */
    private $dapAPI;

    /**
     * @var MockObject
     */
    private $datasourceService;

    // Brand service
    public function setUp(): void {
        $this->dapAPI = MockObjectProvider::instance()->getMockInstance(DAPAPI::class);
        $this->datasourceService = MockObjectProvider::instance()->getMockInstance(DatasourceService::class);
        $this->dapAPI->returnValue("datasource", $this->datasourceService);

        $this->brandService = new BrandService($this->dapAPI);
    }

    public function testOnCreateOfNewBrandItIsSavedLocallyAndAPIIsCalledRemotely() {
        AuthenticationHelper::login("admin@kinicart.com", "password");
        $this->brandService->saveBrand("test", 1);

        $this->assertEquals(1, sizeof(Brand::filter("WHERE name = ?", "test")));
        $this->assertTrue($this->datasourceService->methodWasCalled("updateDatasourceInstance",
            [
                "brands_6",
                [
                    ["brand" => "test"]
                ],
                "replace"
            ]));

    }


    public function testOnRemoveOfBrandItIsRemovedLocallyAndAPIIsCalledToRemoveRemotelyProvidedNotLastOccurrence() {

        AuthenticationHelper::login("admin@kinicart.com", "password");
        $this->brandService->saveBrand("deleteme", 6);

        AuthenticationHelper::login("sam@samdavisdesign.co.uk", "password");
        $this->brandService->saveBrand("deleteme", 1);

        $brands = Brand::filter("WHERE name = ?", "deleteme");
        $this->assertEquals(1, sizeof($brands));
        $this->brandService->removeBrand($brands[0]->getId());

        $brands = Brand::filter("WHERE name = ?", "deleteme");
        $this->assertEquals(0, sizeof($brands));

        // Should not have been called because one in another account
        $this->assertFalse($this->datasourceService->methodWasCalled("updateDatasourceInstance",
            [
                "brands_6",
                [
                    ["brand" => "deleteme"]
                ],
                "delete"
            ]));



        AuthenticationHelper::login("admin@kinicart.com", "password");

        $brands = Brand::filter("WHERE name = ?", "deleteme");
        $this->assertEquals(1, sizeof($brands));
        $this->brandService->removeBrand($brands[0]->getId());

        // Should have been called because last one
        $this->assertTrue($this->datasourceService->methodWasCalled("updateDatasourceInstance",
            [
                "brands_6",
                [
                    ["brand" => "deleteme"]
                ],
                "delete"
            ]));

    }

}