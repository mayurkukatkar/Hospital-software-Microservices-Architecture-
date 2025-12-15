package com.mayur.pharmacy.dto;

import com.mayur.pharmacy.domain.DispenseOrder.DispenseStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class DispenseDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "Patient ID is required")
        private String patientId;

        private Long doctorId;
        private String prescriptionReference;

        @NotEmpty(message = "Items cannot be empty")
        private List<DispenseItemRequest> items;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DispenseItemRequest {
        @NotBlank(message = "Medicine code is required")
        private String medicineCode;

        @NotNull(message = "Quantity is required")
        private Integer quantity;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String patientId;
        private Long doctorId;
        private String prescriptionReference;
        private DispenseStatus status;
        private List<DispenseItemResponse> items;
        private LocalDateTime dispenseDate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DispenseItemResponse {
        private String medicineName;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal totalPrice;
    }
}

