import type { UserPage } from "@/auth/domain/interfaces/user-page.interface";
import type { UserAPIResponse } from "../dto/response/user-api.response";
import type { UsersApiResponse } from "../dto/response/users-api.response";
import type { User } from "@/auth/domain/entities/user.entity";

export class UserMapper {
  static toDomain(appointments: UsersApiResponse): UserPage {
    const data: User[] = appointments.results.map(result => ({
      id: result.id,
      name: result.name,
      phone: result.phone,
      email: result.email,
      password: result.password,
      createdAt: new Date(result.createdAt),
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : undefined,
      role: result.role,
    }));
    
    return {
      data,
      total: appointments.total,
    };
  }
  
  static toDomainSingle(result: UserAPIResponse): User {
    return {
      id: result.id,
      name: result.name,
      phone: result.phone,
      email: result.email,
      password: result.password,
      role: result.role,
      createdAt: new Date(result.createdAt),
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : undefined,
    };
  }
}
