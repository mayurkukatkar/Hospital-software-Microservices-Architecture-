package com.mayur.lab.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "lab_tests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code; // e.g. CBC, HBA1C

    @Column(nullable = false)
    private String name; // e.g. Complete Blood Count

    @Column(nullable = false)
    private BigDecimal price;

    private String specimenType; // e.g. Blood, Urine
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String referenceRange; // e.g. "4.0 - 5.5"
    private String unit; // e.g. "mmol/L"
}

