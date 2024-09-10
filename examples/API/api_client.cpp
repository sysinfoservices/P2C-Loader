
#include "api_client.h"
#include <iostream>
#include <nlohmann/json.hpp> 

using json = nlohmann::json;  

APIClient::APIClient(const std::string& host, int port) {
    client = new httplib::Client(host.c_str(), port);
}

APIClient::~APIClient() {
    delete client;
}

bool APIClient::login(const std::string& username, const std::string& password, const std::string& hwid) {

    json body;
    body["username"] = username;
    body["password"] = password;

    auto res = client->Post("/api/auth/login", body.dump(), "application/json");
    if (res && res->status == 200) {
        auto jsonResponse = json::parse(res->body);
        if (jsonResponse.contains("token")) {
            jwtToken = jsonResponse["token"].get<std::string>();
            std::cout << "Login successful! Token stored." << std::endl;
            return true;
        }
        else {
            std::cout << "Login failed: Token not found in response." << std::endl;
            return false;
        }
    }
    else {
        std::cout << "Failed to login. Status: " << json::parse(res->body) << std::endl;
        return false;
    }
}

std::string APIClient::registerUser(const std::string& username, const std::string& email, const std::string& password) {

    json body;
    body["username"] = username;
    body["email"] = email;
    body["password"] = password;

    auto res = client->Post("/api/auth/register", body.dump(), "application/json");
    if (res && res->status == 200) {
        return res->body;
    }
    else {
        return "Failed to register. Status: " + (res->body);
    }
}


std::string APIClient::getProducts() {

    if (jwtToken.empty()) {
        return "Error: Not authenticated. Please log in first.";
    }

    httplib::Headers headers = {
        { "Authorization", "Bearer " + jwtToken }
    };

    auto res = client->Get("/api/products/get-products", headers);
    if (res && res->status == 200) {
        return res->body;
    }
    else {
        return "Failed to get products. Status: " + (res->body);
    }
}

std::string APIClient::assignKey(const std::string& licenseKey) {
    if (jwtToken.empty()) {
        return "Error: Not authenticated. Please log in first.";
    }

    json body;
    body["license_key"] = licenseKey;

    httplib::Headers headers = {
        { "Authorization", "Bearer " + jwtToken }
    };

    auto res = client->Post("/api/loader/assign-key", headers, body.dump(), "application/json");
    if (res && res->status == 200) {
        return res->body;
    }
    else {
        return "Failed to assign key. Status: " + std::to_string(res->status);
    }
}