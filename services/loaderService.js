const License = require('../models/licenseModel');

const loaderService = {
    // Assign license key
    assignKey: async (licenseKey, userId, callback) => {
        // Step 1: Find the license by the licenseKey
        License.findByLicenseKey(licenseKey, (err, license) => {
            if (err) {
                // Return the error message if the license key is not found
                return callback(err);
            }

            // Step 2: Check if the license key is already used by another user
            if (license.used_by > 0) {
                return callback('This license key is already in use by another user.');
            }

            // Step 3: Check if the user already has a license for the same product
            License.findByUserAndProduct(userId, license.product, (existingLicense) => {
                if (existingLicense) {
                    // If the user already has a license for this product, update the duration
                    const updatedDuration = existingLicense.duration + license.duration;
                    License.updateDuration(existingLicense.id, updatedDuration, () => {
                        return callback(null, 'License duration updated successfully');
                    });
                } else {
                    // If the user doesn't have a license for this product, assign the new license
                    License.assignLicenseToUser(license.id, userId, () => {
                        // Start the timer for the license
                        License.startTimer(license.id, () => {
                            return callback(null, 'License assigned and timer started');
                        });
                    });
                }
            });
        });
    },

    // todo AES-256 CBC encrypted byte streaming logic usermode
    getUsermode: async ( userId, productID, callback) => {
        return callback('Success');

    },

    // todo AES-256 CBC encrypted byte streaming logic for kernelmode
    getKernelmode: async ( userId, productID, callback) => {
        return callback('Success');
    },

};

module.exports = loaderService;
