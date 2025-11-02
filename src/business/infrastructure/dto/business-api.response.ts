export interface BusinessAPIResponse {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  logo: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}
