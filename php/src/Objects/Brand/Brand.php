<?php

namespace DNSBrandWatch\Objects\Brand;

use Kinikit\Persistence\ORM\ActiveRecord;

/**
 * Class Brand
 *
 * @table dbw_brand
 * @generate
 */
class Brand extends ActiveRecord {

    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $brand;

    /**
     * @var string
     */
    private $projectKey;

    /**
     * @var integer
     */
    private $accountId;

    public function __construct($brand = null, $projectKey = null, $accountId = null) {
        $this->brand = $brand;
        $this->projectKey = $projectKey;
        $this->accountId = $accountId;
    }

    /**
     * @return int
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id) {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getBrand() {
        return $this->brand;
    }

    /**
     * @param string $brand
     */
    public function setBrand($brand) {
        $this->brand = $brand;
    }

    /**
     * @return string
     */
    public function getProjectKey() {
        return $this->projectKey;
    }

    /**
     * @param string $projectKey
     */
    public function setProjectKey($projectKey) {
        $this->projectKey = $projectKey;
    }

    /**
     * @return int
     */
    public function getAccountId() {
        return $this->accountId;
    }

    /**
     * @param int $accountId
     */
    public function setAccountId($accountId) {
        $this->accountId = $accountId;
    }


}
