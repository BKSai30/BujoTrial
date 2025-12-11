import axios from "axios";
import type { VetClinic } from "../models/Clinic";

const API_BASE_URL = "http://localhost:8080";

export interface ClinicFilterParams {
  city?: string;
  state?: string;
}

export interface CreateClinicPayload {
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  openingHours: string;
  emergencyAvailable: boolean;
}

export async function fetchClinics(params: ClinicFilterParams = {}): Promise<VetClinic[]> {
  const response = await axios.get<VetClinic[]>(`${API_BASE_URL}/api/clinics`, {
    params: {
      city: params.city || undefined,
      state: params.state || undefined,
    },
  });
  return response.data;
}

export async function fetchClinic(id: number): Promise<VetClinic> {
  const response = await axios.get<VetClinic>(`${API_BASE_URL}/api/clinics/${id}`);
  return response.data;
}

export async function createClinic(payload: CreateClinicPayload): Promise<VetClinic> {
  const response = await axios.post<VetClinic>(`${API_BASE_URL}/api/clinics`, payload);
  return response.data;
}
