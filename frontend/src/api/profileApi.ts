import axios from "axios";
import type { UserProfile, Pet } from "../models/Profile";

const API_BASE_URL = "http://localhost:8080";

export async function fetchUserProfile(): Promise<UserProfile | null> {
  const url = API_BASE_URL + "/api/profile/user";
  const response = await axios.get<UserProfile | null>(url);
  return response.data;
}

export async function saveUserProfile(payload: Omit<UserProfile, "id">): Promise<UserProfile> {
  const url = API_BASE_URL + "/api/profile/user";
  const response = await axios.post<UserProfile>(url, payload);
  return response.data;
}

export async function fetchPets(): Promise<Pet[]> {
  const url = API_BASE_URL + "/api/profile/pets";
  const response = await axios.get<Pet[]>(url);
  return response.data;
}

export async function createPet(payload: Omit<Pet, "id">): Promise<Pet> {
  const url = API_BASE_URL + "/api/profile/pets";
  const response = await axios.post<Pet>(url, payload);
  return response.data;
}

export async function fetchPet(id: number): Promise<Pet> {
  const url = API_BASE_URL + "/api/profile/pets/" + id;
  const response = await axios.get<Pet>(url);
  return response.data;
}

export async function deletePet(id: number): Promise<void> {
  const url = API_BASE_URL + "/api/profile/pets/" + id;
  await axios.delete(url);
}
