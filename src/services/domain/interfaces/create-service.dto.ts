export interface CreateServiceDTO {
  name: string;
  duration: string; // e.g. "30" (minutes) or "00:30"
  price?: string;
  notes?: string;
  createdBy: string;
}

export type UpdateServiceDTO = Partial<CreateServiceDTO>
