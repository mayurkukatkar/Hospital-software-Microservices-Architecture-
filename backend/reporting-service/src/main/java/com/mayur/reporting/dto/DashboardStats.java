package com.mayur.reporting.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private long totalPatients;
    private long totalAppointmentsToday;
    private long pendingLabOrders;
    private long lowStockItems;
    private BigDecimal totalRevenueToday;
    
    // Example: "Cardiology" -> 15, "Orthopedics" -> 10
    private Map<String, Long> appointmentsByDepartment; 
}

