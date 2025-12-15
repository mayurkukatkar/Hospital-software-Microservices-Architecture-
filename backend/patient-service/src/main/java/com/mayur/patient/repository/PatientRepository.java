package com.mayur.patient.repository;

import com.mayur.patient.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByMrn(String mrn);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByMrn(String mrn);
}

