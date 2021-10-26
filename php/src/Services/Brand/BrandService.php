<?php

namespace DNSBrandWatch\Services\Brand;

use DNSBrandWatch\Objects\Brand\Brand;
use Kiniauth\Objects\Account\Account;

class BrandService {

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
    public function listBrands($filterString = "", $limit = 25, $offset = 0, $projectKey = null, $accountId = Account::LOGGED_IN_ACCOUNT) {

        $query = "WHERE accountId = ?";
        $params = [$accountId];

        if ($projectKey) {
            $query .= " AND project_key = ?";
            $params[] = $projectKey;
        }

        if ($filterString) {
            $query .= " AND brand like ?";
            $params[] = "%$filterString%";
        }

        $query .= " ORDER BY brand ASC LIMIT ? OFFSET ?";
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
    public function saveBrand($brandName, $projectKey = null, $accountId = Account::LOGGED_IN_ACCOUNT) {
        $brand = new Brand($brandName, $projectKey, $accountId);
        $brand->save();
    }

    /**
     * Delete an existing brand
     *
     * @param integer $id
     */
    public function removeBrand($id) {
        $brand = Brand::fetch($id);
        $brand->remove();
    }

}
