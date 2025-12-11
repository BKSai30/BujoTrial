package com.istrides.bujo;

import com.istrides.bujo.adoption.Adoption;
import com.istrides.bujo.donor.Donor;
import com.istrides.bujo.emergency.Emergency;
import com.istrides.bujo.event.Event;
import com.istrides.bujo.adoption.AdoptionRepository;
import com.istrides.bujo.donor.DonorRepository;
import com.istrides.bujo.emergency.EmergencyRepository;
import com.istrides.bujo.event.EventRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/nearme")
@CrossOrigin(origins = "http://localhost:5173")
public class NearMeController {

    private final AdoptionRepository adoptionRepository;
    private final DonorRepository donorRepository;
    private final EmergencyRepository emergencyRepository;
    private final EventRepository eventRepository;

    public NearMeController(
            AdoptionRepository adoptionRepository,
            DonorRepository donorRepository,
            EmergencyRepository emergencyRepository,
            EventRepository eventRepository
    ) {
        this.adoptionRepository = adoptionRepository;
        this.donorRepository = donorRepository;
        this.emergencyRepository = emergencyRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public NearMeResponse getNearMe(
            @RequestParam String city,
            @RequestParam(required = false) String state
    ) {
        String normalizedCity = city.trim();

        List<Adoption> adoptions = adoptionRepository.findByCity(normalizedCity);
        List<Donor> donors = donorRepository.findByCityIgnoreCase(normalizedCity);
        List<Emergency> emergencies = emergencyRepository.findByCityIgnoreCase(normalizedCity);
        List<Event> events = eventRepository.findByCityIgnoreCase(normalizedCity);

        if (state != null && !state.isBlank()) {
            String normalizedState = state.trim();

            donors = donors.stream()
                    .filter(d -> d.getState() != null && d.getState().equalsIgnoreCase(normalizedState))
                    .collect(Collectors.toList());

            emergencies = emergencies.stream()
                    .filter(e -> e.getState() != null && e.getState().equalsIgnoreCase(normalizedState))
                    .collect(Collectors.toList());

            events = events.stream()
                    .filter(ev -> ev.getState() != null && ev.getState().equalsIgnoreCase(normalizedState))
                    .collect(Collectors.toList());

            return new NearMeResponse(
                    normalizedCity,
                    normalizedState,
                    adoptions,
                    donors,
                    emergencies,
                    events
            );
        }

        return new NearMeResponse(
                normalizedCity,
                null,
                adoptions,
                donors,
                emergencies,
                events
        );
    }
}
