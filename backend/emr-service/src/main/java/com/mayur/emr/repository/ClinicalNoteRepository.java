package com.mayur.emr.repository;

import com.mayur.emr.domain.ClinicalNote;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClinicalNoteRepository extends MongoRepository<ClinicalNote, String> {
    List<ClinicalNote> findByPatientId(String patientId);
    List<ClinicalNote> findByVisitId(Long visitId);
}

