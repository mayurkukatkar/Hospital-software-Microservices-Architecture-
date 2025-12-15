package com.mayur.emr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EmrServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmrServiceApplication.class, args);
    }
}

