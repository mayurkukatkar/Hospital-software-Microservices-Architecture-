package com.mayur.billing.service;

import com.mayur.billing.domain.BillItem;
import com.mayur.billing.domain.Invoice;
import com.mayur.billing.domain.Invoice.InvoiceStatus;
import com.mayur.billing.domain.Payment;
import com.mayur.billing.dto.InvoiceRequest;
import com.mayur.billing.dto.InvoiceResponse;
import com.mayur.billing.dto.PaymentRequest;
import com.mayur.billing.repository.InvoiceRepository;
import com.mayur.billing.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BillingService {

    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;

    @Transactional
    public InvoiceResponse createInvoice(InvoiceRequest request) {
        log.info("Creating invoice for Patient: {}", request.getPatientId());

        BigDecimal totalAmount = BigDecimal.ZERO;
        final BigDecimal[] total = {BigDecimal.ZERO}; // mutable for lambda

        List<BillItem> items = request.getItems().stream().map(itemReq -> {
            BigDecimal amount = itemReq.getUnitPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            total[0] = total[0].add(amount);
            return BillItem.builder()
                    .description(itemReq.getDescription())
                    .unitPrice(itemReq.getUnitPrice())
                    .quantity(itemReq.getQuantity())
                    .amount(amount)
                    .build();
        }).collect(Collectors.toList());

        Invoice invoice = Invoice.builder()
                .patientId(request.getPatientId())
                .visitId(request.getVisitId())
                .items(items)
                .totalAmount(total[0])
                .status(InvoiceStatus.ISSUED)
                .insurancePolicyNumber(request.getInsurancePolicyNumber())
                .build();

        // Bi-directional link
        items.forEach(item -> item.setInvoice(invoice));

        Invoice savedInvoice = invoiceRepository.save(invoice);
        log.info("Invoice created with ID: {}", savedInvoice.getId());

        return mapToResponse(savedInvoice);
    }

    @Transactional
    public void processPayment(PaymentRequest request) {
        log.info("Processing payment for Invoice: {}", request.getInvoiceId());

        Invoice invoice = invoiceRepository.findById(request.getInvoiceId())
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + request.getInvoiceId()));

        Payment payment = Payment.builder()
                .invoice(invoice)
                .amount(request.getAmount())
                .paymentMethod(request.getPaymentMethod())
                .transactionReference(request.getTransactionReference())
                .build();

        paymentRepository.save(payment);

        // Update Invoice Status
        // Simple logic: if payment >= total, mark PAID. Else PARTIAL_PAID.
        // Needs aggregation of all payments in real world.
        if (request.getAmount().compareTo(invoice.getTotalAmount()) >= 0) {
            invoice.setStatus(InvoiceStatus.PAID);
        } else {
            invoice.setStatus(InvoiceStatus.PARTIAL_PAID);
        }
        invoiceRepository.save(invoice);
        
        log.info("Payment processed. Status: {}", invoice.getStatus());
    }

    public List<InvoiceResponse> getInvoicesByPatient(String patientId) {
        return invoiceRepository.findByPatientId(patientId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private InvoiceResponse mapToResponse(Invoice invoice) {
        return InvoiceResponse.builder()
                .id(invoice.getId())
                .patientId(invoice.getPatientId())
                .visitId(invoice.getVisitId())
                .totalAmount(invoice.getTotalAmount())
                .status(invoice.getStatus())
                .insurancePolicyNumber(invoice.getInsurancePolicyNumber())
                .createdAt(invoice.getCreatedAt())
                .items(invoice.getItems().stream().map(i -> InvoiceResponse.BillItemResponse.builder()
                        .description(i.getDescription())
                        .unitPrice(i.getUnitPrice())
                        .quantity(i.getQuantity())
                        .amount(i.getAmount())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}

