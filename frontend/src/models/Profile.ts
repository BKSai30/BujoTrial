export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  ageYears: number | null;
  weightKg: number | null;
  notes: string;
}
