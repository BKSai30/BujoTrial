package com.istrides.bujo.clinic;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VetClinicRepository extends JpaRepository<VetClinic, Long> {

    List<VetClinic> findByCityIgnoreCase(String city);

    List<VetClinic> findByStateIgnoreCase(String state);

    List<VetClinic> findByCityIgnoreCaseAndStateIgnoreCase(String city, String state);
}
