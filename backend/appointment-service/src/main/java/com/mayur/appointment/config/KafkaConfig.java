package com.mayur.appointment.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    public static final String APPOINTMENT_BOOKED_TOPIC = "appointment_booked";

    @Bean
    public NewTopic appointmentBookedTopic() {
        return TopicBuilder.name(APPOINTMENT_BOOKED_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }
}

