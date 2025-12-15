package com.mayur.pharmacy.service;

import com.mayur.pharmacy.domain.DispenseItem;
import com.mayur.pharmacy.domain.DispenseOrder;
import com.mayur.pharmacy.domain.DispenseOrder.DispenseStatus;
import com.mayur.pharmacy.domain.Medicine;
import com.mayur.pharmacy.dto.DispenseDto;
import com.mayur.pharmacy.dto.MedicineDto;
import com.mayur.pharmacy.repository.DispenseOrderRepository;
import com.mayur.pharmacy.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PharmacyService {

    private final MedicineRepository medicineRepository;
    private final DispenseOrderRepository dispenseOrderRepository;

    // --- Inventory Management ---

    @Transactional
    public MedicineDto addMedicine(MedicineDto request) {
        Medicine medicine = medicineRepository.findByCode(request.getCode()).orElse(
                Medicine.builder()
                        .code(request.getCode())
                        .build()
        );

        medicine.setName(request.getName());
        medicine.setManufacturer(request.getManufacturer());
        medicine.setPrice(request.getPrice());
        medicine.setStockQuantity(request.getStockQuantity());
        medicine.setExpiryDate(request.getExpiryDate());

        medicine = medicineRepository.save(medicine);
        log.info("Updated Medicine stock: {}", medicine.getCode());
        return mapToMedicineDto(medicine);
    }

    public List<MedicineDto> getAllMedicines() {
        return medicineRepository.findAll().stream()
                .map(this::mapToMedicineDto)
                .collect(Collectors.toList());
    }

    // --- Dispensing ---

    @Transactional
    public DispenseDto.Response dispenseMedicines(DispenseDto.Request request) {
        log.info("Dispensing medicines for Patient: {}", request.getPatientId());

        DispenseOrder order = DispenseOrder.builder()
                .patientId(request.getPatientId())
                .doctorId(request.getDoctorId())
                .prescriptionReference(request.getPrescriptionReference())
                .status(DispenseStatus.PENDING)
                .items(new ArrayList<>())
                .build();

        List<DispenseItem> items = request.getItems().stream().map(itemReq -> {
            Medicine medicine = medicineRepository.findByCode(itemReq.getMedicineCode())
                    .orElseThrow(() -> new IllegalArgumentException("Medicine not found: " + itemReq.getMedicineCode()));

            if (medicine.getStockQuantity() < itemReq.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for medicine: " + medicine.getName());
            }

            // Deduct Stock
            medicine.setStockQuantity(medicine.getStockQuantity() - itemReq.getQuantity());
            medicineRepository.save(medicine);

            BigDecimal totalPrice = medicine.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));

            return DispenseItem.builder()
                    .order(order)
                    .medicine(medicine)
                    .quantity(itemReq.getQuantity())
                    .unitPrice(medicine.getPrice())
                    .totalPrice(totalPrice)
                    .build();
        }).collect(Collectors.toList());

        order.setItems(items);
        order.setStatus(DispenseStatus.DISPENSED); // Auto-complete for now

        DispenseOrder savedOrder = dispenseOrderRepository.save(order);
        log.info("Dispensed Order ID: {}", savedOrder.getId());
        return mapToDispenseResponse(savedOrder);
    }

    public List<DispenseDto.Response> getOrdersByPatient(String patientId) {
        return dispenseOrderRepository.findByPatientId(patientId).stream()
                .map(this::mapToDispenseResponse)
                .collect(Collectors.toList());
    }

    // --- Mappers ---

    private MedicineDto mapToMedicineDto(Medicine medicine) {
        return MedicineDto.builder()
                .id(medicine.getId())
                .code(medicine.getCode())
                .name(medicine.getName())
                .manufacturer(medicine.getManufacturer())
                .price(medicine.getPrice())
                .stockQuantity(medicine.getStockQuantity())
                .expiryDate(medicine.getExpiryDate())
                .build();
    }

    private DispenseDto.Response mapToDispenseResponse(DispenseOrder order) {
        return DispenseDto.Response.builder()
                .id(order.getId())
                .patientId(order.getPatientId())
                .doctorId(order.getDoctorId())
                .prescriptionReference(order.getPrescriptionReference())
                .status(order.getStatus())
                .dispenseDate(order.getDispenseDate())
                .items(order.getItems().stream().map(item -> DispenseDto.DispenseItemResponse.builder()
                        .medicineName(item.getMedicine().getName())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .totalPrice(item.getTotalPrice())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}

