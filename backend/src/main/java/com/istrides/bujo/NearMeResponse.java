package com.istrides.bujo;

import com.istrides.bujo.adoption.Adoption;
import com.istrides.bujo.donor.Donor;
import com.istrides.bujo.emergency.Emergency;
import com.istrides.bujo.event.Event;

import java.util.List;


public class NearMeResponse {

    private String city;
    private String state;

    private List<Adoption> adoptions;
    private List<Donor> donors;
    private List<Emergency> emergencies;
    private List<Event> events;

    public NearMeResponse() {
    }

    public NearMeResponse(
            String city,
            String state,
            List<Adoption> adoptions,
            List<Donor> donors,
            List<Emergency> emergencies,
            List<Event> events
    ) {
        this.city = city;
        this.state = state;
        this.adoptions = adoptions;
        this.donors = donors;
        this.emergencies = emergencies;
        this.events = events;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<Adoption> getAdoptions() {
        return adoptions;
    }

    public void setAdoptions(List<Adoption> adoptions) {
        this.adoptions = adoptions;
    }

    public List<Donor> getDonors() {
        return donors;
    }

    public void setDonors(List<Donor> donors) {
        this.donors = donors;
    }

    public List<Emergency> getEmergencies() {
        return emergencies;
    }

    public void setEmergencies(List<Emergency> emergencies) {
        this.emergencies = emergencies;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }
}
