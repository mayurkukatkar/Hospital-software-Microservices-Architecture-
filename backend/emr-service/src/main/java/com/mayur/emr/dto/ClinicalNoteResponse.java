package com.mayur.emr.dto;

import com.mayur.emr.domain.Prescription;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalNoteResponse {
    private String id;
    private String patientId;
    private Long doctorId;
    private Long visitId;
    private String chiefComplaint;
    private List<String> diagnosis;
    private String historyOfPresentIllness;
    private List<Prescription> prescriptions;
    private LocalDateTime createdAt;
}

