package com.mayur.reporting.service;

import com.mayur.reporting.dto.DashboardStats;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class ReportingService {

    // In a real implementation, this would either query a dedicated Analytics DB
    // or make FeignClient calls to other services to aggregate live data.
    // For this MVP phase, we will return hardcoded mock data to demonstrate the structure.
    
    public DashboardStats getDashboardStats() {
        log.info("Fetching dashboard stats...");
        
        Map<String, Long> deptStats = new HashMap<>();
        deptStats.put("Cardiology", 12L);
        deptStats.put("Pediatrics", 8L);
        deptStats.put("Orthopedics", 5L);

        return DashboardStats.builder()
                .totalPatients(150)
                .totalAppointmentsToday(25)
                .pendingLabOrders(5)
                .lowStockItems(3)
                .totalRevenueToday(new BigDecimal("12500.00"))
                .appointmentsByDepartment(deptStats)
                .build();
    }
}

