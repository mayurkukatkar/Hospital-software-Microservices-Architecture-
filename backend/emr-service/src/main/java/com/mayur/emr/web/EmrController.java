package com.mayur.emr.web;

import com.mayur.emr.dto.ClinicalNoteRequest;
import com.mayur.emr.dto.ClinicalNoteResponse;
import com.mayur.emr.service.EmrService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emr")
@RequiredArgsConstructor
public class EmrController {

    private final EmrService emrService;

    @PostMapping("/notes")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ClinicalNoteResponse> createClinicalNote(@Valid @RequestBody ClinicalNoteRequest request) {
        return new ResponseEntity<>(emrService.createClinicalNote(request), HttpStatus.CREATED);
    }

    @GetMapping("/notes")
    public ResponseEntity<List<ClinicalNoteResponse>> getNotesByPatient(@RequestParam String patientId) {
        return ResponseEntity.ok(emrService.getNotesByPatientId(patientId));
    }
}

