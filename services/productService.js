const License = require('../models/licenseModel');
const Product = require('../models/productModel');


const productService = {

    // Get products by user licenses
    getProducts: async (userId, callback) => {
        // Step 1: Find all licenses assigned to the user
        License.findByUserId(userId, async (licenses) => {
            if (!licenses || licenses.length === 0) {
                return callback(null, []);
            }

            // Step 2: Get product details for each license
            const products = await Promise.all(
                licenses.map((license) => {
                    return new Promise((resolve) => {
                        Product.findById(license.product, (product) => {
                            if (product) {
                                resolve({
                                    product_id: product.product_id,
                                    product_name: product.product_name,
                                    product_status: product.product_status,
                                    product_kernelmode: product.product_kernelmode,
                                });
                            } else {
                                resolve(null); // In case the product is not found
                            }
                        });
                    });
                })
            );

            // Step 3: Filter out null products and return the list
            callback(null, products.filter((product) => product !== null));
        });
    },

};

module.exports = productService;
