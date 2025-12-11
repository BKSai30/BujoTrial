package com.istrides.bujo.clinic;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinics")
@CrossOrigin(origins = "http://localhost:5173")
public class VetClinicController {

    private final VetClinicRepository clinicRepository;

    public VetClinicController(VetClinicRepository clinicRepository) {
        this.clinicRepository = clinicRepository;
    }

    @GetMapping
    public List<VetClinic> getClinics(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state
    ) {
        if (city != null && !city.isBlank() && state != null && !state.isBlank()) {
            return clinicRepository.findByCityIgnoreCaseAndStateIgnoreCase(city.trim(), state.trim());
        } else if (city != null && !city.isBlank()) {
            return clinicRepository.findByCityIgnoreCase(city.trim());
        } else if (state != null && !state.isBlank()) {
            return clinicRepository.findByStateIgnoreCase(state.trim());
        } else {
            return clinicRepository.findAll();
        }
    }

    @GetMapping("/{id}")
    public VetClinic getClinic(@PathVariable Long id) {
        return clinicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Clinic not found"));
    }

    @PostMapping
    public VetClinic createClinic(@RequestBody VetClinicCreateRequest request) {
        VetClinic clinic = new VetClinic();
        clinic.setName(request.getName());
        clinic.setCity(request.getCity());
        clinic.setState(request.getState());
        clinic.setAddress(request.getAddress());
        clinic.setPhone(request.getPhone());
        clinic.setOpeningHours(request.getOpeningHours());
        clinic.setEmergencyAvailable(request.isEmergencyAvailable());
        return clinicRepository.save(clinic);
    }
}
