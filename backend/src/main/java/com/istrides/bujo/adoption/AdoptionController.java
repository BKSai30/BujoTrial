package com.istrides.bujo.adoption;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/adoptions")
@CrossOrigin(origins = "http://localhost:5173")
public class AdoptionController {

    private final AdoptionRepository repo;

    public AdoptionController(AdoptionRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Adoption> list(@RequestParam(required = false) String city) {
        if (city != null && !city.isEmpty()) {
            return repo.findByCity(city);
        }
        return repo.findAll();
    }

    @PostMapping
    public Adoption create(@RequestBody Adoption adoption) {
        return repo.save(adoption);
    }

    @GetMapping("/{id}")
    public Adoption get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }
}
