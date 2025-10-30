export interface CreateClientDTO {
  name: string;
  phone: string;
  email: string;
  identification: string;
  address?: string;
  createdBy: string;
}

export type UpdateClientDTO = Partial<CreateClientDTO>
