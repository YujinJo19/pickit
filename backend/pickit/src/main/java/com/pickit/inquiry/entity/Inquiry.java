package com.pickit.inquiry.entity;

import jakarta.persistence.*;

@Entity
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}