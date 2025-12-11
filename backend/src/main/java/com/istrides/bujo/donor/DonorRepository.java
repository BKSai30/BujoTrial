package com.istrides.bujo.donor;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByCityIgnoreCase(String city);

    List<Donor> findByBloodGroupIgnoreCase(String bloodGroup);
}
