import type { Service } from "@/services/domain/entities/service.entity";
import type { ServicePage } from "@/services/domain/interfaces/service-page.interface";
import type { ServiceAPIResponse } from "../dto/response/service-api.response";
import type { ServicesApiResponse } from "../dto/response/services-api.response";

export class ServiceMapper {
  static toDomain(services: ServicesApiResponse): ServicePage {
    const data: Service[] = services.data.map(result => ({
      id: result.id,
      name: result.name,
      duration: result.duration,
      price: result.price,
      notes: result.notes,
      isActive: result.isActive,
      createdBy: result.createdBy,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt),
    }));

    return {
      data,
      total: services.total,
    };
  }
  
  static toDomainSingle(result: ServiceAPIResponse): Service {
    return {
      id: result.id,
      name: result.name,
      duration: result.duration,
      price: result.price,
      notes: result.notes,
      createdBy: result.createdBy,
      createdAt: new Date(result.createdAt),
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : undefined,
    };
  }
}
