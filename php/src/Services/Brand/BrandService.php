<?php

namespace DNSBrandWatch\Services\Brand;

use DNSBrandWatch\Objects\Brand\Brand;
use DNSBrandWatch\Services\Util\DAPAPI;
use Kiniauth\Objects\Account\Account;
use Kinikit\Core\Configuration\Configuration;

class BrandService {

    /**
     * @var DAPAPI
     */
    private $dapAPI;


    /**
     * BrandService constructor.
     * @param DAPAPI $dapAPI
     */
    public function __construct($dapAPI) {
        $this->dapAPI = $dapAPI;
    }

    /**
     * List the alert groups for a specified project and account
     * using offset and limit accordingly
     *
     * @param string $filterString
     * @param int $limit
     * @param int $offset
     * @param string $projectKey
     * @param int $accountId
     */
    public function listBrands($filterString = "", $limit = 25, $offset = 0, $accountId = Account::LOGGED_IN_ACCOUNT) {

        $query = "WHERE accountId = ?";
        $params = [$accountId];


        if ($filterString) {
            $query .= " AND name like ?";
            $params[] = "%$filterString%";
        }

        $query .= " ORDER BY name ASC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        return Brand::filter($query, $params);
    }

    /**
     * Save a new brand
     *
     * @param string $brandName
     * @param null $projectKey
     * @param string $accountId
     */
    public function saveBrand($brandName, $accountId = Account::LOGGED_IN_ACCOUNT) {

        // Save brand locally
        $brand = new Brand($brandName, $accountId, $brandName);
        $brand->save();


        // Synchronise with DAP
        $datasourceKey = Configuration::readParameter("dap.brands.dataset");
        $this->dapAPI->datasource()->updateDatasourceInstance($datasourceKey, [
            ["brand" => $brandName]
        ], "replace");
    }

    /**
     * Delete an existing brand by name
     *
     * @param integer $id
     */
    public function removeBrand($id) {

        // Remove the brand
        $brand = Brand::fetch($id);
        $brand->remove();

        $remainingBrands = Brand::values("COUNT(*)", "WHERE name = ?", $brand->getName());

        if ($remainingBrands[0] == 0) {

            // Synchronise with DAP
            $datasourceKey = Configuration::readParameter("dap.brands.dataset");
            $this->dapAPI->datasource()->updateDatasourceInstance($datasourceKey, [
                ["brand" => $brand->getName()]
            ], "delete");
        }
    }

}
