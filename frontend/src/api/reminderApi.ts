import axios from "axios";
import type { Reminder } from "../models/Reminder";

const API_BASE_URL = "http://localhost:8080";

export interface ReminderFilterParams {
  upcomingOnly?: boolean;
  petName?: string;
}

export interface CreateReminderPayload {
  title: string;
  description: string;
  type: string;
  petName: string;
  dueDateTime: string; // ISO string
}

export interface UpdateReminderStatusPayload {
  completed: boolean;
}

export async function fetchReminders(params: ReminderFilterParams = {}): Promise<Reminder[]> {
  const response = await axios.get<Reminder[]>(`${API_BASE_URL}/api/reminders`, {
    params: {
      upcomingOnly: params.upcomingOnly ?? undefined,
      petName: params.petName || undefined,
    },
  });
  return response.data;
}

export async function fetchReminder(id: number): Promise<Reminder> {
  const response = await axios.get<Reminder>(`${API_BASE_URL}/api/reminders/${id}`);
  return response.data;
}

export async function createReminder(payload: CreateReminderPayload): Promise<Reminder> {
  const response = await axios.post<Reminder>(`${API_BASE_URL}/api/reminders`, payload);
  return response.data;
}

export async function updateReminderStatus(id: number, payload: UpdateReminderStatusPayload): Promise<Reminder> {
  const response = await axios.patch<Reminder>(`${API_BASE_URL}/api/reminders/${id}/status`, payload);
  return response.data;
}

export async function deleteReminder(id: number): Promise<void> {
  await axios.delete(`${API_BASE_URL}/api/reminders/${id}`);
}
