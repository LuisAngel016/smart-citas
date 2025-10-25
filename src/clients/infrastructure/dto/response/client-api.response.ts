export interface ClientAPIResponse {
  id:             string;
  name:           string;
  phone:          number;
  email:          string;
  identification: number;
  address:        string;
  isActive:       boolean;
  createdBy:      string;
  createdAt:      Date;
  updatedAt:      Date;
}
