package com.mayur.patient.service;

import com.mayur.patient.domain.Patient;
import com.mayur.patient.dto.PatientRequest;
import com.mayur.patient.dto.PatientResponse;
import com.mayur.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientService {

    private final PatientRepository patientRepository;

    @Transactional
    public PatientResponse registerPatient(PatientRequest request) {
        log.info("Registering new patient: {} {}", request.getFirstName(), request.getLastName());

        // Check for duplicates (simple check by phone for now)
        if (patientRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new IllegalArgumentException("Patient with this phone number already exists.");
        }

        String mrn = generateMrn();
        
        Patient patient = Patient.builder()
                .mrn(mrn)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .address(request.getAddress())
                .emergencyContactName(request.getEmergencyContactName())
                .emergencyContactPhone(request.getEmergencyContactPhone())
                .build();

        Patient savedPatient = patientRepository.save(patient);
        log.info("Patient registered successfully with MRN: {}", savedPatient.getMrn());

        return mapToResponse(savedPatient);
    }

    @Transactional(readOnly = true)
    public PatientResponse getPatientByMrn(String mrn) {
        return patientRepository.findByMrn(mrn)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Patient not found with MRN: " + mrn));
    }
    
    @Transactional(readOnly = true)
    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private String generateMrn() {
        // Realistic MRN format: P-YYYY-XXXXX
        // In a real high-concurrency production system, this should use a Redis counter or DB sequence.
        // For this implementation, we will use a random 5 digit number to avoid complexity, but keep the format.
        int year = Year.now().getValue();
        int randomNum = new Random().nextInt(90000) + 10000;
        return String.format("P-%d-%d", year, randomNum);
    }

    private PatientResponse mapToResponse(Patient patient) {
        return PatientResponse.builder()
                .id(patient.getId())
                .mrn(patient.getMrn())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .dateOfBirth(patient.getDateOfBirth())
                .gender(patient.getGender())
                .phoneNumber(patient.getPhoneNumber())
                .email(patient.getEmail())
                .address(patient.getAddress())
                .emergencyContactName(patient.getEmergencyContactName())
                .emergencyContactPhone(patient.getEmergencyContactPhone())
                .createdAt(patient.getCreatedAt())
                .build();
    }
}

