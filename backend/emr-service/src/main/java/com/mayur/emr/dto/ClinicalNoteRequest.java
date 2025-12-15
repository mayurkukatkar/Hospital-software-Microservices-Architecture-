package com.mayur.emr.dto;

import com.mayur.emr.domain.Prescription;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalNoteRequest {

    @NotBlank(message = "Patient ID is required")
    private String patientId;

    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @NotNull(message = "Visit ID is required")
    private Long visitId;

    @NotBlank(message = "Chief complaint is required")
    private String chiefComplaint;

    private List<String> diagnosis;
    
    private String historyOfPresentIllness;

    private List<Prescription> prescriptions;
}

