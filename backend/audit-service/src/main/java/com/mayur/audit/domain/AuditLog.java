package com.mayur.audit.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {
    
    @Id
    private String id;
    
    private String eventType; // e.g. APPOINTMENT_BOOKED
    private String entityId;  // e.g. Appointment ID
    private String userId;    // Who triggered it
    private String details;   // JSON payload of the event
    
    private LocalDateTime timestamp;
}

