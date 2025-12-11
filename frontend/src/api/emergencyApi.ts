import axios from "axios";
import { Emergency } from "../models/Emergency";

const API_BASE = "http://localhost:8080/api";

export async function fetchEmergencies(params?: {
  city?: string;
  state?: string;
}): Promise<Emergency[]> {
  const res = await axios.get<Emergency[]>(`${API_BASE}/emergencies`, { params });
  return res.data;
}

export async function createEmergency(data: Emergency): Promise<Emergency> {
  const res = await axios.post<Emergency>(`${API_BASE}/emergencies`, data);
  return res.data;
}

export async function fetchEmergency(id: number): Promise<Emergency> {
  const res = await axios.get<Emergency>(`${API_BASE}/emergencies/${id}`);
  return res.data;
}
