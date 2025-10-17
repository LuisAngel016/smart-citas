export interface UserAPIResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: 'user' | 'admin';
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
}
