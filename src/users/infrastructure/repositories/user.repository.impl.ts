import type { User } from "@/auth/domain/entities/user.entity";
import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";
import type { IUserRepository } from "@/users/domain/repositories/user.repository";
import type { UpdateUserFormDTO } from "@/users/domain/interfaces/update-user-form.dto";
import type { UserAPIResponse } from "../dto/response/user-api.response";
import type { UserImageUploadResponse } from "../dto/user-image-upload.response";
import { UserMapper } from "../mappers/user.mapper";

export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly httpClient: IHttpClient) {}
  
  // async getAll(): Promise<User[]> {
  //   const { data } = await this.httpClient.get<User[]>("/users");
  //   return data;
  // }
  
  async getById(id: string): Promise<User> {
    const { data } = await this.httpClient.get<UserAPIResponse>(`/users/${id}`);
    const user = UserMapper.toDomainSingle(data);
    return user;
  }
  
  async update(id: string, userData: UpdateUserFormDTO): Promise<User> {
    let imageFileName: string | null | undefined = userData.imageUrl instanceof File ? undefined : userData.imageUrl;
    
    // Si hay una imagen y es un File, primero subirla y obtener el fileName
    if (userData.imageUrl && userData.imageUrl instanceof File) {
      const formData = new FormData();
      formData.append('file', userData.imageUrl);

      const { data: uploadResponse } = await this.httpClient.post<UserImageUploadResponse>(
        '/files/users',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      // Asignar el fileName obtenido
      imageFileName = uploadResponse.fileName;
    }
    
    // Preparar el payload con el fileName (si corresponde)
    const payload = {
      ...userData,
      imageUrl: imageFileName ?? undefined,
    };
    
    // Actualizar el usuario con los datos (incluyendo el fileName si se subió imagen)
    const { data } = await this.httpClient.patch<UserAPIResponse>(`/users/${id}`, payload);
    const user = UserMapper.toDomainSingle(data);
    return user;
  }
  
  async delete(id: string): Promise<boolean> {
    await this.httpClient.delete(`/users/${id}`);
    return true;
  }
}
