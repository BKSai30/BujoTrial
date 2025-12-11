package com.istrides.bujo.event;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final EventRepository repo;

    public EventController(EventRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Event> list(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false, defaultValue = "false") boolean upcomingOnly) {

        if (city != null && !city.isBlank()) {
            return repo.findByCityIgnoreCase(city);
        }
        if (state != null && !state.isBlank()) {
            return repo.findByStateIgnoreCase(state);
        }
        if (upcomingOnly) {
            return repo.findByDateTimeAfter(LocalDateTime.now());
        }
        return repo.findAll();
    }

    @PostMapping
    public Event create(@RequestBody Event event) {
        return repo.save(event);
    }

    @GetMapping("/{id}")
    public Event get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }
}
