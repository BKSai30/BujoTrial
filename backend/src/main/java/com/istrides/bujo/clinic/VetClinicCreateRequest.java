package com.istrides.bujo.clinic;

public class VetClinicCreateRequest {

    private String name;
    private String city;
    private String state;
    private String address;
    private String phone;
    private String openingHours;
    private boolean emergencyAvailable;

    public VetClinicCreateRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(String openingHours) {
        this.openingHours = openingHours;
    }

    public boolean isEmergencyAvailable() {
        return emergencyAvailable;
    }

    public void setEmergencyAvailable(boolean emergencyAvailable) {
        this.emergencyAvailable = emergencyAvailable;
    }
}
