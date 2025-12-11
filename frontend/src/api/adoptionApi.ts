import axios from "axios";
import { Adoption } from "../models/Adoption";

const API_BASE = "http://localhost:8080/api";

export async function fetchAdoptions(city?: string): Promise<Adoption[]> {
  const res = await axios.get<Adoption[]>(`${API_BASE}/adoptions`, {
    params: { city },
  });
  return res.data;
}

export async function createAdoption(data: Adoption): Promise<Adoption> {
  const res = await axios.post<Adoption>(`${API_BASE}/adoptions`, data);
  return res.data;
}

export async function fetchAdoption(id: number): Promise<Adoption> {
  const res = await axios.get<Adoption>(`${API_BASE}/adoptions/${id}`);
  return res.data;
}
