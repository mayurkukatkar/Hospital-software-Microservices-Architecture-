package com.mayur.emr.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "clinical_notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicalNote {

    @Id
    private String id;

    private String patientId; // Reference to Patient MRN
    private Long doctorId;    // Reference to Doctor ID from IAM
    private Long visitId;     // Reference to Visit/Appointment ID

    private String chiefComplaint;
    private List<String> diagnosis; // ICD-10 Codes or Free text
    private String historyOfPresentIllness;
    
    private List<Prescription> prescriptions; // Embedded

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

