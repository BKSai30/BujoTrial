import axios from "axios";
import type { NearMeResponse } from "../models/NearMe";

const API_BASE_URL = "http://localhost:8080";

export interface NearMeParams {
  city: string;
  state?: string;
}

export async function fetchNearMe(params: NearMeParams): Promise<NearMeResponse> {
  const response = await axios.get<NearMeResponse>(`${API_BASE_URL}/api/nearme`, {
    params: {
      city: params.city,
      state: params.state || undefined,
    },
  });
  return response.data;
}
