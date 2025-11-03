export interface UserAPIResponse {
  id:        string;
  email:     string;
  fullName:  string;
  phone:     string;
  imageUrl:  string;
  location:  string;
  bio:       string;
  isActive:  boolean;
  roles:     string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

