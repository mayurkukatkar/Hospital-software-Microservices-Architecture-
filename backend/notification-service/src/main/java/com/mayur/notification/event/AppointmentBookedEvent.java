package com.mayur.notification.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentBookedEvent {
    private Long appointmentId;
    private String patientId;
    private Long doctorId;
    private LocalDateTime appointmentTime;
}

