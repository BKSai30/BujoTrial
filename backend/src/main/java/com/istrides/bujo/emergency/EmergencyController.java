package com.istrides.bujo.emergency;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/emergencies")
@CrossOrigin(origins = "http://localhost:5173")
public class EmergencyController {

    private final EmergencyRepository repo;

    public EmergencyController(EmergencyRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Emergency> list(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state) {

        if (city != null && !city.isBlank()) {
            return repo.findByCityIgnoreCase(city);
        }
        if (state != null && !state.isBlank()) {
            return repo.findByStateIgnoreCase(state);
        }
        return repo.findAll();
    }

    @PostMapping
    public Emergency create(@RequestBody Emergency emergency) {
        return repo.save(emergency);
    }

    @GetMapping("/{id}")
    public Emergency get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }
}
