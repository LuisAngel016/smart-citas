import type { Business } from "@/business/domain/entities/business.entity";
import type { BusinessAPIResponse } from "../dto/business-api.response";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export class BusinessMapper {
  static toDomainSingle(result: BusinessAPIResponse): Business {
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      phone: result.phone,
      email: result.email,
      address: result.address,
      logo: `${ VITE_API_URL }/files/business/${result.logo}`,
      createdBy: result.createdBy,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt),
    };
  }
}
