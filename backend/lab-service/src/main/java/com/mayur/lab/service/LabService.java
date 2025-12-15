package com.mayur.lab.service;

import com.mayur.lab.domain.LabOrder;
import com.mayur.lab.domain.LabOrder.OrderStatus;
import com.mayur.lab.domain.LabTest;
import com.mayur.lab.dto.LabOrderDto;
import com.mayur.lab.dto.LabTestDto;
import com.mayur.lab.repository.LabOrderRepository;
import com.mayur.lab.repository.LabTestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LabService {

    private final LabTestRepository labTestRepository;
    private final LabOrderRepository labOrderRepository;

    // --- Lab Test Catalog ---

    @Transactional
    public LabTestDto.Response createLabTest(LabTestDto.Request request) {
        if (labTestRepository.findByCode(request.getCode()).isPresent()) {
            throw new IllegalArgumentException("Lab test with code " + request.getCode() + " already exists.");
        }

        LabTest labTest = LabTest.builder()
                .code(request.getCode())
                .name(request.getName())
                .price(request.getPrice())
                .specimenType(request.getSpecimenType())
                .description(request.getDescription())
                .referenceRange(request.getReferenceRange())
                .unit(request.getUnit())
                .build();

        labTest = labTestRepository.save(labTest);
        log.info("Created Lab Test: {}", labTest.getCode());
        return mapTestToResponse(labTest);
    }

    public List<LabTestDto.Response> getAllTests() {
        return labTestRepository.findAll().stream()
                .map(this::mapTestToResponse)
                .collect(Collectors.toList());
    }

    // --- Lab Orders ---

    @Transactional
    public LabOrderDto.Response orderTest(LabOrderDto.Request request) {
        LabTest test = labTestRepository.findByCode(request.getTestCode())
                .orElseThrow(() -> new IllegalArgumentException("Lab test not found: " + request.getTestCode()));

        LabOrder order = LabOrder.builder()
                .patientId(request.getPatientId())
                .doctorId(request.getDoctorId())
                .test(test)
                .status(OrderStatus.ORDERED)
                .build();

        order = labOrderRepository.save(order);
        log.info("Created Lab Order ID: {}", order.getId());
        return mapOrderToResponse(order);
    }

    @Transactional
    public LabOrderDto.Response updateStatus(Long orderId, OrderStatus status) {
        LabOrder order = labOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        
        order.setStatus(status);
        order = labOrderRepository.save(order);
        log.info("Updated Order ID: {} to Status: {}", orderId, status);
        return mapOrderToResponse(order);
    }

    @Transactional
    public LabOrderDto.Response enterResult(Long orderId, LabOrderDto.ResultUpdateRequest result) {
        LabOrder order = labOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        order.setResultValue(result.getResultValue());
        order.setAbnormal(result.isAbnormal());
        order.setRemarks(result.getRemarks());
        order.setStatus(OrderStatus.COMPLETED); // Auto-complete on result entry
        
        order = labOrderRepository.save(order);
        log.info("Entered result for Order ID: {}", orderId);
        return mapOrderToResponse(order);
    }

    public List<LabOrderDto.Response> getOrdersByPatient(String patientId) {
        return labOrderRepository.findByPatientId(patientId).stream()
                .map(this::mapOrderToResponse)
                .collect(Collectors.toList());
    }

    // --- Mappers ---

    private LabTestDto.Response mapTestToResponse(LabTest test) {
        return LabTestDto.Response.builder()
                .id(test.getId())
                .code(test.getCode())
                .name(test.getName())
                .price(test.getPrice())
                .specimenType(test.getSpecimenType())
                .description(test.getDescription())
                .referenceRange(test.getReferenceRange())
                .unit(test.getUnit())
                .build();
    }

    private LabOrderDto.Response mapOrderToResponse(LabOrder order) {
        return LabOrderDto.Response.builder()
                .id(order.getId())
                .patientId(order.getPatientId())
                .doctorId(order.getDoctorId())
                .test(mapTestToResponse(order.getTest()))
                .status(order.getStatus())
                .resultValue(order.getResultValue())
                .isAbnormal(order.isAbnormal())
                .remarks(order.getRemarks())
                .orderDate(order.getOrderDate())
                .resultDate(order.getResultDate())
                .build();
    }
}

