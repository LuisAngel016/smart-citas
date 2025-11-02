export interface Business {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  logo: string | null;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}
