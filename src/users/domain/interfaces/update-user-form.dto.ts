export interface UpdateUserFormDTO {
  name?: string;
  email?: string;
  phone?: string;
  imageUrl?: string | File | null;
  location?: string;
  bio?: string;
  roles?: string[];
}
