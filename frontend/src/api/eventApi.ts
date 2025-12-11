import axios from "axios";
import { Event } from "../models/Event";

const API_BASE = "http://localhost:8080/api";

export async function fetchEvents(params?: {
  city?: string;
  state?: string;
  upcomingOnly?: boolean;
}): Promise<Event[]> {
  const res = await axios.get<Event[]>(`${API_BASE}/events`, { params });
  return res.data;
}

export async function createEvent(data: Event): Promise<Event> {
  const res = await axios.post<Event>(`${API_BASE}/events`, data);
  return res.data;
}

export async function fetchEvent(id: number): Promise<Event> {
  const res = await axios.get<Event>(`${API_BASE}/events/${id}`);
  return res.data;
}
