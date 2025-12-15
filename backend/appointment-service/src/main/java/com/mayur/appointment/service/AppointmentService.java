package com.mayur.appointment.service;

import com.mayur.appointment.domain.Appointment;
import com.mayur.appointment.domain.Appointment.AppointmentStatus;
import com.mayur.appointment.dto.AppointmentRequest;
import com.mayur.appointment.dto.AppointmentResponse;
import com.mayur.appointment.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final org.springframework.kafka.core.KafkaTemplate<String, com.mayur.appointment.event.AppointmentBookedEvent> kafkaTemplate;

    @Transactional
    public AppointmentResponse bookAppointment(AppointmentRequest request) {
        log.info("Booking appointment for Patient: {} with Doctor: {} at {}", 
                request.getPatientId(), request.getDoctorId(), request.getAppointmentTime());

        // Basic conflict check (simplistic: check if doctor has appt at same time - assuming 30 min slots)
        LocalDateTime start = request.getAppointmentTime();
        LocalDateTime end = start.plusMinutes(30); // 30 min slots
        
        List<Appointment> conflicts = appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(
                request.getDoctorId(), start, end.minusSeconds(1)); // Overlap check

        if (!conflicts.isEmpty()) {
            throw new IllegalArgumentException("Doctor is not available at the requested time.");
        }

        Appointment appointment = Appointment.builder()
                .patientId(request.getPatientId())
                .doctorId(request.getDoctorId())
                .appointmentTime(request.getAppointmentTime())
                .status(AppointmentStatus.SCHEDULED)
                .reason(request.getReason())
                .build();

        Appointment savedAppointment = appointmentRepository.save(appointment);
        log.info("Appointment booked successfully. ID: {}", savedAppointment.getId());

        // Publish AppointmentBooked event to Kafka
        com.mayur.appointment.event.AppointmentBookedEvent event = com.mayur.appointment.event.AppointmentBookedEvent.builder()
                .appointmentId(savedAppointment.getId())
                .patientId(savedAppointment.getPatientId())
                .doctorId(savedAppointment.getDoctorId())
                .appointmentTime(savedAppointment.getAppointmentTime())
                .build();
        
        // Asynchronously send event
        kafkaTemplate.send(com.mayur.appointment.config.KafkaConfig.APPOINTMENT_BOOKED_TOPIC, event);
        log.info("Published AppointmentBookedEvent for ID: {}", savedAppointment.getId());
        
        return mapToResponse(savedAppointment);
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsByPatient(String patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {
        return AppointmentResponse.builder()
                .id(appointment.getId())
                .patientId(appointment.getPatientId())
                .doctorId(appointment.getDoctorId())
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus())
                .reason(appointment.getReason())
                .createdAt(appointment.getCreatedAt())
                .build();
    }
}

