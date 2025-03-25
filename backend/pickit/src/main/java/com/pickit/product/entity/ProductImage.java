package com.pickit.product.entity;

import jakarta.persistence.*;

@Entity
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}