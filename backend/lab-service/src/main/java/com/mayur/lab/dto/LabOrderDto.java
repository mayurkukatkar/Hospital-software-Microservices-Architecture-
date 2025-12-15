package com.mayur.lab.dto;

import com.mayur.lab.domain.LabOrder.OrderStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class LabOrderDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "Patient ID is required")
        private String patientId;

        private Long doctorId;

        @NotBlank(message = "Test Code is required")
        private String testCode; // Referring to LabTest Code
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String patientId;
        private Long doctorId;
        private LabTestDto.Response test;
        private OrderStatus status;
        private String resultValue;
        private boolean isAbnormal;
        private String remarks;
        private LocalDateTime orderDate;
        private LocalDateTime resultDate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResultUpdateRequest {
        @NotBlank(message = "Result value is required")
        private String resultValue;
        
        private boolean isAbnormal;
        private String remarks;
    }
}

