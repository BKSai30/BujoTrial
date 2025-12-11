package com.istrides.bujo.emergency;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmergencyRepository extends JpaRepository<Emergency, Long> {

    List<Emergency> findByCityIgnoreCase(String city);

    List<Emergency> findByStateIgnoreCase(String state);
}
