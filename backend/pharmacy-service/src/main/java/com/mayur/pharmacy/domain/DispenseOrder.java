package com.mayur.pharmacy.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "dispense_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DispenseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String patientId;

    private Long doctorId; // Prescriber
    
    // Can link to EMR Prescription ID if needed
    private String prescriptionReference; 

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DispenseItem> items;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DispenseStatus status;

    @CreationTimestamp
    private LocalDateTime dispenseDate;

    public enum DispenseStatus {
        PENDING,
        DISPENSED,
        CANCELLED
    }
}

