package com.istrides.bujo.reminder;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    List<Reminder> findByCompletedFalseAndDueDateTimeAfterOrderByDueDateTimeAsc(LocalDateTime now);

    List<Reminder> findByCompletedFalseOrderByDueDateTimeAsc();

    List<Reminder> findByPetNameIgnoreCaseOrderByDueDateTimeAsc(String petName);
}
