package com.mayur.pharmacy.repository;

import com.mayur.pharmacy.domain.DispenseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DispenseOrderRepository extends JpaRepository<DispenseOrder, Long> {
    List<DispenseOrder> findByPatientId(String patientId);
}

