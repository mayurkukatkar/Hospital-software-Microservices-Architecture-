package com.mayur.appointment.dto;

import com.mayur.appointment.domain.Appointment.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private Long id;
    private String patientId;
    private Long doctorId;
    private LocalDateTime appointmentTime;
    private AppointmentStatus status;
    private String reason;
    private LocalDateTime createdAt;
}

