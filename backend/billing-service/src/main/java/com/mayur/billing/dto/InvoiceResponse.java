package com.mayur.billing.dto;

import com.mayur.billing.domain.Invoice.InvoiceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceResponse {
    private Long id;
    private String patientId;
    private Long visitId;
    private BigDecimal totalAmount;
    private InvoiceStatus status;
    private String insurancePolicyNumber;
    private List<BillItemResponse> items;
    private LocalDateTime createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BillItemResponse {
        private String description;
        private BigDecimal unitPrice;
        private Integer quantity;
        private BigDecimal amount;
    }
}

