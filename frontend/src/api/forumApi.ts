import axios from "axios";
import type { ForumThread, ForumThreadDetails, ForumReply } from "../models/Forum";

const API_BASE_URL = "http://localhost:8080";

export interface CreateThreadPayload {
  title: string;
  content: string;
  authorName: string;
}

export interface CreateReplyPayload {
  content: string;
  authorName: string;
}

export async function fetchThreads(): Promise<ForumThread[]> {
  const response = await axios.get<ForumThread[]>(`${API_BASE_URL}/api/forum/threads`);
  return response.data;
}

export async function createThread(payload: CreateThreadPayload): Promise<ForumThread> {
  const response = await axios.post<ForumThread>(`${API_BASE_URL}/api/forum/threads`, payload);
  return response.data;
}

export async function fetchThreadDetails(id: number): Promise<ForumThreadDetails> {
  const response = await axios.get<ForumThreadDetails>(`${API_BASE_URL}/api/forum/threads/${id}`);
  return response.data;
}

export async function createReply(threadId: number, payload: CreateReplyPayload): Promise<ForumReply> {
  const response = await axios.post<ForumReply>(`${API_BASE_URL}/api/forum/threads/${threadId}/replies`, payload);
  return response.data;
}
