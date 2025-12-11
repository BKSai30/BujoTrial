import axios from "axios";
import { Donor } from "../models/Donor";

const API_BASE = "http://localhost:8080/api";

export async function fetchDonors(params?: {
  city?: string;
  bloodGroup?: string;
}): Promise<Donor[]> {
  const res = await axios.get<Donor[]>(`${API_BASE}/donors`, { params });
  return res.data;
}

export async function createDonor(data: Donor): Promise<Donor> {
  const res = await axios.post<Donor>(`${API_BASE}/donors`, data);
  return res.data;
}

export async function fetchDonor(id: number): Promise<Donor> {
  const res = await axios.get<Donor>(`${API_BASE}/donors/${id}`);
  return res.data;
}
