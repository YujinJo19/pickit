package com.pickit.config;

import jakarta.persistence.*;

@Entity
public class SecurityConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}