package com.pickit.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  // REST API 컨트롤러 지정
@RequestMapping("/api/test")  // API 기본 URL 설정
public class TestController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, PickIt API!";
    }
}
