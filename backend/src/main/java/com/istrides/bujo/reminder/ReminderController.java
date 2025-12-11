package com.istrides.bujo.reminder;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@CrossOrigin(origins = "http://localhost:5173")
public class ReminderController {

    private final ReminderRepository reminderRepository;

    public ReminderController(ReminderRepository reminderRepository) {
        this.reminderRepository = reminderRepository;
    }

    @GetMapping
    public List<Reminder> getReminders(
            @RequestParam(required = false) Boolean upcomingOnly,
            @RequestParam(required = false) String petName
    ) {
        if (petName != null && !petName.isBlank()) {
            return reminderRepository.findByPetNameIgnoreCaseOrderByDueDateTimeAsc(petName.trim());
        }
        if (Boolean.TRUE.equals(upcomingOnly)) {
            return reminderRepository.findByCompletedFalseAndDueDateTimeAfterOrderByDueDateTimeAsc(LocalDateTime.now());
        }
        return reminderRepository.findByCompletedFalseOrderByDueDateTimeAsc();
    }

    @GetMapping("/{id}")
    public Reminder getReminder(@PathVariable Long id) {
        return reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
    }

    @PostMapping
    public Reminder createReminder(@RequestBody ReminderCreateRequest request) {
        Reminder reminder = new Reminder();
        reminder.setTitle(request.getTitle());
        reminder.setDescription(request.getDescription());
        reminder.setType(request.getType());
        reminder.setPetName(request.getPetName());
        reminder.setDueDateTime(request.getDueDateTime());
        reminder.setCompleted(false);
        return reminderRepository.save(reminder);
    }

    @PatchMapping("/{id}/status")
    public Reminder updateReminderStatus(@PathVariable Long id, @RequestBody ReminderUpdateStatusRequest request) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
        reminder.setCompleted(request.isCompleted());
        return reminderRepository.save(reminder);
    }

    @DeleteMapping("/{id}")
    public void deleteReminder(@PathVariable Long id) {
        reminderRepository.deleteById(id);
    }
}
