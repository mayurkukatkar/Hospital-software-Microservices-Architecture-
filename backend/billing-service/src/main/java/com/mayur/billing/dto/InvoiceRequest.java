package com.mayur.billing.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceRequest {

    @NotBlank(message = "Patient ID is required")
    private String patientId;

    private Long visitId;

    @NotEmpty(message = "Bill items cannot be empty")
    private List<BillItemRequest> items;

    private String insurancePolicyNumber;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BillItemRequest {
        @NotBlank(message = "Description is required")
        private String description;

        @NotNull(message = "Unit price is required")
        private BigDecimal unitPrice;

        @NotNull(message = "Quantity is required")
        private Integer quantity;
    }
}

