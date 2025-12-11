import type { Adoption } from "./Adoption";
import type { Donor } from "./Donor";
import type { Emergency } from "./Emergency";
import type { Event } from "./Event";

export interface NearMeResponse {
  city: string;
  state?: string | null;
  adoptions: Adoption[];
  donors: Donor[];
  emergencies: Emergency[];
  events: Event[];
}
