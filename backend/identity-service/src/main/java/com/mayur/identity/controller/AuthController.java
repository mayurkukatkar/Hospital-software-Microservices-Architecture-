package com.mayur.identity.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;

@RestController
public class AuthController {

    @PostMapping("/token")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if ("admin@example.com".equals(username) && "password".equals(password)) {
            // Mock Token (In a real app, use JWT)
            Map<String, String> response = new HashMap<>();
            response.put("token", "mock-jwt-token-for-admin");
            // Note: The Resource Servers (Gateways) verify JWT signature.
            // A mock string won't work if they enable strict verification.
            // But for now, let's see if we can get past the login screen.
            return response;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}

