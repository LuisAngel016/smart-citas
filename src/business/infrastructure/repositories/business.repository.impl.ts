import type { Business } from "@/business/domain/entities/business.entity";
import type { IBusinessRepository } from "@/business/domain/repositories/business.repository";
import { httpClient } from "@/shared/api";
import type { BusinessAPIResponse } from "../dto/business-api.response";
import type { BusinessImageUploadResponse } from "../dto/business-url-image.response";
import { BusinessMapper } from "../mappers/business.mapper";
import type { UpdateBusinessFormDTO } from "@/business/domain/interfaces/update-business-form.dto";

export class BusinessRepositoryImpl implements IBusinessRepository {
  constructor(private readonly client = httpClient) {}

  async getAll(): Promise<Business> {
    const { data } = await this.client.get<BusinessAPIResponse>("/business");
    const business = BusinessMapper.toDomainSingle(data);
    return business;
  }

  async update(data: UpdateBusinessFormDTO): Promise<Business> {
    let logoFileName: string | null | undefined = data.logo instanceof File ? undefined : data.logo;
    // Si hay un logo y es un File (imagen), primero subirlo y obtener el fileName
    if (data.logo && data.logo instanceof File) {
      const formData = new FormData();
      formData.append('file', data.logo);

      const { data: uploadResponse } = await this.client.post<BusinessImageUploadResponse>(
        '/files/business',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      // Asignar el fileName obtenido
      logoFileName = uploadResponse.fileName;
    }
    
    // Preparar el payload con el fileName (si corresponde)
    const payload = {
      name: data.name,
      description: data.description,
      phone: data.phone,
      email: data.email,
      address: data.address,
      logo: logoFileName,
      createdBy: data.createdBy,
    };
    
    // Actualizar el business con los datos (incluyendo el fileName si se subió imagen)
    const { data: res } = await this.client.patch<BusinessAPIResponse>('/business', payload);
    const business = BusinessMapper.toDomainSingle(res);
    return business;
  }
}
