package com.pickit.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/hello") // React에서 호출할 API 경로
    public String sayHello() {
        return "Hello from Spring Boot!";
    }
}
