package com.pickit.global.exception;

import jakarta.persistence.*;

@Entity
public class GlobalExceptionHandler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}