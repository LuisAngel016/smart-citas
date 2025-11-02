/**
 * DTO para actualizar business desde el formulario
 * Acepta File para el logo, que será procesado por el repositorio
 */
export interface UpdateBusinessFormDTO {
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  logo?: File | string | null;
  createdBy?: string;
}
