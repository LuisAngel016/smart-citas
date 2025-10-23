export interface UserAPIResponse {
  id:         string;
  email:      string;
  fullName:   string;
  isActive:   boolean;
  roles:      string[];
  creado_por: null;
  createdAt:  Date;
  updatedAt:  Date;
}
