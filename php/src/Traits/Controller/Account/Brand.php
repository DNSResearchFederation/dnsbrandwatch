<?php

namespace DNSBrandWatch\Traits\Controller\Account;

use DNSBrandWatch\Services\Brand\BrandService;

trait Brand {

    /**
     * @var BrandService
     */
    private $brandService;


    /**
     * @param BrandService $brandService
     */
    public function __construct($brandService) {
        $this->brandService = $brandService;
    }

    /**
     * List the brands for a given account and project key if required
     *
     * @http GET /
     *
     * @param string $filterString
     * @param int $limit
     * @param int $offset
     * @param null $projectKey
     * @return mixed
     */
    public function listBrands($filterString = "", $limit = 25, $offset = 0, $projectKey = null) {
        return $this->brandService->listBrands($filterString, $limit, $offset, $projectKey);
    }

    /**
     * Save a brand
     *
     * @http POST
     *
     * @param mixed $payload
     */
    public function saveBrand($payload) {
        $this->brandService->saveBrand(
            $payload["brandName"],
            isset($payload["projectKey"]) ? $payload["projectKey"] : null
        );
    }

    /**
     * Removes a brand
     *
     * @http DELETE /$id
     *
     * @param $id
     */
    public function removeBrand($id) {
        $this->brandService->removeBrand($id);
    }
}
