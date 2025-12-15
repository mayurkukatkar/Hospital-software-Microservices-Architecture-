package com.mayur.billing.web;

import com.mayur.billing.dto.InvoiceRequest;
import com.mayur.billing.dto.InvoiceResponse;
import com.mayur.billing.dto.PaymentRequest;
import com.mayur.billing.service.BillingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    @PostMapping("/invoices")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<InvoiceResponse> createInvoice(@Valid @RequestBody InvoiceRequest request) {
        return new ResponseEntity<>(billingService.createInvoice(request), HttpStatus.CREATED);
    }

    @PostMapping("/payments")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> processPayment(@Valid @RequestBody PaymentRequest request) {
        billingService.processPayment(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/invoices")
    public ResponseEntity<List<InvoiceResponse>> getInvoices(@RequestParam String patientId) {
        return ResponseEntity.ok(billingService.getInvoicesByPatient(patientId));
    }
}

