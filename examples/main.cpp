#include "API/api_client.h"
#include <iostream>

int main() {

	// Create the API client
	APIClient client("localhost", 233);

	// Login
	if (client.login("testuser", "password123","random-hwid-123")) {
		// Get products after successful login
		std::string productsResponse = client.getProducts();
		std::cout << "Products Response: " << productsResponse << std::endl;
	}

	// Assign a key 
	//std::string licenseKey = "license_key_here";
	//std::string assignKeyResponse = client.assignKey(licenseKey);
	//std::cout << "Assign Key Response: " << assignKeyResponse << std::endl;

	return 0;
}