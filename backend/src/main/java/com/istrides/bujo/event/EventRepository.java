package com.istrides.bujo.event;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByCityIgnoreCase(String city);

    List<Event> findByStateIgnoreCase(String state);

    List<Event> findByDateTimeAfter(LocalDateTime dateTime);
}
