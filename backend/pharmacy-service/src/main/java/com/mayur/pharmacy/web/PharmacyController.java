package com.mayur.pharmacy.web;

import com.mayur.pharmacy.dto.DispenseDto;
import com.mayur.pharmacy.dto.MedicineDto;
import com.mayur.pharmacy.service.PharmacyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacy")
@RequiredArgsConstructor
public class PharmacyController {

    private final PharmacyService pharmacyService;

    // --- Inventory ---

    @PostMapping("/medicines")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<MedicineDto> addMedicine(@Valid @RequestBody MedicineDto request) {
        return new ResponseEntity<>(pharmacyService.addMedicine(request), HttpStatus.CREATED);
    }

    @GetMapping("/medicines")
    public ResponseEntity<List<MedicineDto>> getAllMedicines() {
        return ResponseEntity.ok(pharmacyService.getAllMedicines());
    }

    // --- Dispensing ---

    @PostMapping("/dispense")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<DispenseDto.Response> dispenseMedicines(@Valid @RequestBody DispenseDto.Request request) {
        return new ResponseEntity<>(pharmacyService.dispenseMedicines(request), HttpStatus.CREATED);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<DispenseDto.Response>> getOrders(@RequestParam String patientId) {
        return ResponseEntity.ok(pharmacyService.getOrdersByPatient(patientId));
    }
}

