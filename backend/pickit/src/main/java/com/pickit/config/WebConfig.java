package com.pickit.config;

import jakarta.persistence.*;

@Entity
public class WebConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}