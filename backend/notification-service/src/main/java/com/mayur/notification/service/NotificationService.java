package com.mayur.notification.service;

import com.mayur.notification.event.AppointmentBookedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender emailSender;

    @KafkaListener(topics = "appointment_booked", groupId = "notification-group")
    public void handleAppointmentBooked(AppointmentBookedEvent event) {
        log.info("Received AppointmentBookedEvent for Appointment ID: {}", event.getAppointmentId());
        
        // In a real app, we would fetch Patient email from Patient Service or Identity Service
        // For MVP, we send to a default test email
        sendEmail("patient@example.com", 
                "Appointment Confirmation", 
                "Your appointment with Doctor ID " + event.getDoctorId() + 
                " is confirmed for " + event.getAppointmentTime());
    }

    public void sendEmail(String to, String subject, String text) {
        log.info("Sending email to: {}", to);
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@mayur.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            emailSender.send(message);
            log.info("Email sent successfully.");
        } catch (Exception e) {
            log.error("Failed to send email", e);
        }
    }
}

