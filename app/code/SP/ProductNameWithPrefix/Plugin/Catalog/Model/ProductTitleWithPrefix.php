<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace SP\ProductNameWithPrefix\Plugin\Catalog\Model;

/**
 * Class ProductTitleWithPrefix
 * @package SP\ProductNameWithPrefix\Plugin\Catalog\Model
 */
class ProductTitleWithPrefix
{

	/**
     * Set Prefix with product name
     *
     * @return string
     * @codeCoverageIgnoreStart
     */
    public function afterGetName(\Magento\Catalog\Model\Product $subject, $result)
    {
        $title = "Seepossible ".$result;
        return $title;
    }
}