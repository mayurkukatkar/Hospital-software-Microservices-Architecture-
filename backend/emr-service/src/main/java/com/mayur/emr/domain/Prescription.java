package com.mayur.emr.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prescription {
    private String drugName;
    private String dosage; // e.g. 500mg
    private String frequency; // e.g. BID (Twice a day)
    private String duration; // e.g. 5 days
    private String instructions; // e.g. After food
}

