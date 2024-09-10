// api_client.h
#pragma once
#include <httplib.h>
#include <nlohmann/json.hpp>  
#include <string>

class APIClient {
public:
    APIClient(const std::string& host, int port);
    ~APIClient();

    bool login(const std::string& username, const std::string& password, const std::string& hwid);
    std::string registerUser(const std::string& username, const std::string& email, const std::string& password);
    std::string getProducts();
    std::string assignKey(const std::string& licenseKey);

private:
    httplib::Client* client;
    std::string jwtToken;  
};
