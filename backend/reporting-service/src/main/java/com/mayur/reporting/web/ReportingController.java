package com.mayur.reporting.web;

import com.mayur.reporting.dto.DashboardStats;
import com.mayur.reporting.service.ReportingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reporting")
@RequiredArgsConstructor
public class ReportingController {

    private final ReportingService reportingService;

    @GetMapping("/dashboard")
    public DashboardStats getDashboardStats() {
        return reportingService.getDashboardStats();
    }
}

