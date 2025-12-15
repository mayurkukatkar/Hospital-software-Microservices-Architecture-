package com.mayur.emr.service;

import com.mayur.emr.domain.ClinicalNote;
import com.mayur.emr.dto.ClinicalNoteRequest;
import com.mayur.emr.dto.ClinicalNoteResponse;
import com.mayur.emr.repository.ClinicalNoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmrService {

    private final ClinicalNoteRepository clinicalNoteRepository;

    public ClinicalNoteResponse createClinicalNote(ClinicalNoteRequest request) {
        log.info("Creating clinical note for Patient: {} Visit: {}", request.getPatientId(), request.getVisitId());

        ClinicalNote note = ClinicalNote.builder()
                .patientId(request.getPatientId())
                .doctorId(request.getDoctorId())
                .visitId(request.getVisitId())
                .chiefComplaint(request.getChiefComplaint())
                .diagnosis(request.getDiagnosis())
                .historyOfPresentIllness(request.getHistoryOfPresentIllness())
                .prescriptions(request.getPrescriptions())
                .build();

        ClinicalNote savedNote = clinicalNoteRepository.save(note);
        log.info("Clinical note created. ID: {}", savedNote.getId());

        return mapToResponse(savedNote);
    }

    public List<ClinicalNoteResponse> getNotesByPatientId(String patientId) {
        return clinicalNoteRepository.findByPatientId(patientId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ClinicalNoteResponse mapToResponse(ClinicalNote note) {
        return ClinicalNoteResponse.builder()
                .id(note.getId())
                .patientId(note.getPatientId())
                .doctorId(note.getDoctorId())
                .visitId(note.getVisitId())
                .chiefComplaint(note.getChiefComplaint())
                .diagnosis(note.getDiagnosis())
                .historyOfPresentIllness(note.getHistoryOfPresentIllness())
                .prescriptions(note.getPrescriptions())
                .createdAt(note.getCreatedAt())
                .build();
    }
}

