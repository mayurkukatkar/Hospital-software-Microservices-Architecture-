package com.mayur.lab.repository;

import com.mayur.lab.domain.LabOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabOrderRepository extends JpaRepository<LabOrder, Long> {
    List<LabOrder> findByPatientId(String patientId);
    List<LabOrder> findByStatus(LabOrder.OrderStatus status);
}

