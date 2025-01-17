package com.example.AccentDetection.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class HomeController {
    Authentication auth;

    @GetMapping("/")
    public String getHello()
    {
        return "Hello world DIVYANG";
    }
}
