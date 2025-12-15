package com.mayur.lab.web;

import com.mayur.lab.domain.LabOrder.OrderStatus;
import com.mayur.lab.dto.LabOrderDto;
import com.mayur.lab.dto.LabTestDto;
import com.mayur.lab.service.LabService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab")
@RequiredArgsConstructor
public class LabController {

    private final LabService labService;

    // --- Lab Tests ---

    @PostMapping("/tests")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<LabTestDto.Response> createTest(@Valid @RequestBody LabTestDto.Request request) {
        return new ResponseEntity<>(labService.createLabTest(request), HttpStatus.CREATED);
    }

    @GetMapping("/tests")
    public ResponseEntity<List<LabTestDto.Response>> getAllTests() {
        return ResponseEntity.ok(labService.getAllTests());
    }

    // --- Lab Orders ---

    @PostMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<LabOrderDto.Response> orderTest(@Valid @RequestBody LabOrderDto.Request request) {
        return new ResponseEntity<>(labService.orderTest(request), HttpStatus.CREATED);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<LabOrderDto.Response>> getOrders(@RequestParam String patientId) {
        return ResponseEntity.ok(labService.getOrdersByPatient(patientId));
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<LabOrderDto.Response> updateStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        return ResponseEntity.ok(labService.updateStatus(id, status));
    }

    @PostMapping("/orders/{id}/results")
    public ResponseEntity<LabOrderDto.Response> enterResult(@PathVariable Long id, @Valid @RequestBody LabOrderDto.ResultUpdateRequest request) {
        return ResponseEntity.ok(labService.enterResult(id, request));
    }
}

