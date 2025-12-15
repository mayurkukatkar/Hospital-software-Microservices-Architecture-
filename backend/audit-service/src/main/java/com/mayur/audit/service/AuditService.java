package com.mayur.audit.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mayur.audit.domain.AuditLog;
import com.mayur.audit.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuditService {

    private final AuditLogRepository auditLogRepository;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "appointment_booked", groupId = "audit-group")
    public void handleAppointmentBooked(String message) {
        log.info("Auditing AppointmentBookedEvent: {}", message);
        saveLog("APPOINTMENT_BOOKED", message);
    }
    
    // Can add more listeners for different topics

    private void saveLog(String eventType, String details) {
        AuditLog auditLog = AuditLog.builder()
                .eventType(eventType)
                .details(details)
                .timestamp(LocalDateTime.now())
                // In a real scenario, we'd extract user ID and Entity ID from the JSON
                .build();
        
        auditLogRepository.save(auditLog);
        log.info("Audit log saved. ID: {}", auditLog.getId());
    }
}

