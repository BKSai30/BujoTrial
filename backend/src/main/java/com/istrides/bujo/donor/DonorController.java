package com.istrides.bujo.donor;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "http://localhost:5173")
public class DonorController {

    private final DonorRepository repo;

    public DonorController(DonorRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Donor> list(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String bloodGroup) {

        if (city != null && !city.isBlank()) {
            return repo.findByCityIgnoreCase(city);
        }
        if (bloodGroup != null && !bloodGroup.isBlank()) {
            return repo.findByBloodGroupIgnoreCase(bloodGroup);
        }
        return repo.findAll();
    }

    @PostMapping
    public Donor create(@RequestBody Donor donor) {
        return repo.save(donor);
    }

    @GetMapping("/{id}")
    public Donor get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }
}
