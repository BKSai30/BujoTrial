package com.istrides.bujo.profile;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final UserProfileRepository userProfileRepository;
    private final PetRepository petRepository;

    public ProfileController(UserProfileRepository userProfileRepository, PetRepository petRepository) {
        this.userProfileRepository = userProfileRepository;
        this.petRepository = petRepository;
    }

    // For now, support only a single user profile (first one in DB)
    @GetMapping("/user")
    public UserProfile getUserProfile() {
        return userProfileRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }

    @PostMapping("/user")
    public UserProfile saveUserProfile(@RequestBody UserProfileRequest request) {
        UserProfile profile = userProfileRepository.findAll()
                .stream()
                .findFirst()
                .orElse(new UserProfile());

        profile.setName(request.getName());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setCity(request.getCity());
        profile.setState(request.getState());

        return userProfileRepository.save(profile);
    }

    @GetMapping("/pets")
    public List<Pet> getPets() {
        UserProfile profile = userProfileRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
        if (profile == null) {
            return List.of();
        }
        return petRepository.findByOwnerId(profile.getId());
    }

    @PostMapping("/pets")
    public Pet createPet(@RequestBody PetRequest request) {
        UserProfile profile = userProfileRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        Pet pet = new Pet();
        pet.setOwner(profile);
        pet.setName(request.getName());
        pet.setSpecies(request.getSpecies());
        pet.setBreed(request.getBreed());
        pet.setAgeYears(request.getAgeYears());
        pet.setWeightKg(request.getWeightKg());
        pet.setNotes(request.getNotes());

        return petRepository.save(pet);
    }

    @GetMapping("/pets/{id}")
    public Pet getPet(@PathVariable Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));
    }

    @DeleteMapping("/pets/{id}")
    public void deletePet(@PathVariable Long id) {
        petRepository.deleteById(id);
    }
}
