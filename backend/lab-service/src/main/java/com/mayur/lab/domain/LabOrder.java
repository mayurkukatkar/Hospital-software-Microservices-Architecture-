package com.mayur.lab.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "lab_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String patientId;

    private Long doctorId; // Who ordered it

    @ManyToOne(optional = false)
    @JoinColumn(name = "test_id")
    private LabTest test;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;
    
    // Results (can be simpler for MVP, or separate entity if multiple params)
    private String resultValue;
    private boolean isAbnormal;
    @Column(columnDefinition = "TEXT")
    private String remarks;

    @CreationTimestamp
    private LocalDateTime orderDate;

    @UpdateTimestamp
    private LocalDateTime resultDate;

    public enum OrderStatus {
        ORDERED,
        SAMPLE_COLLECTED,
        RECEIVED_AT_LAB,
        COMPLETED,
        CANCELLED
    }
}

