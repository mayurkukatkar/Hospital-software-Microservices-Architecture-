package com.mayur.patient.web;

import com.mayur.patient.dto.PatientRequest;
import com.mayur.patient.dto.PatientResponse;
import com.mayur.patient.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PatientResponse> registerPatient(@Valid @RequestBody PatientRequest request) {
        return new ResponseEntity<>(patientService.registerPatient(request), HttpStatus.CREATED);
    }

    @GetMapping("/{mrn}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<PatientResponse> getPatientByMrn(@PathVariable String mrn) {
        return ResponseEntity.ok(patientService.getPatientByMrn(mrn));
    }
    
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<PatientResponse>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }
}

