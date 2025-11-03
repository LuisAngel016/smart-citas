import type { UserAPIResponse } from "../dto/response/user-api.response";
import type { User } from "@/auth/domain/entities/user.entity";

const API_URL = import.meta.env.VITE_API_URL;

export class UserMapper {
  // static toDomain(appointments: UsersApiResponse): UserPage {
  //   const data: User[] = appointments.results.map(result => ({
  //     id: result.id,
  //     name: result.fullName,
  //     // phone: result.phone,
  //     email: result.email,
  //     // password: result.password,
  //     createdAt: result.createdAt,
  //     updatedAt: result.updatedAt ? result.updatedAt : undefined,
  //     roles: result.roles,
  //   }));
    
  //   return {
  //     data,
  //     total: appointments.total,
  //   };
  // }
  
  static toDomainSingle(result: UserAPIResponse): User {
    return {
      id: result.id,
      name: result.fullName,
      phone: result.phone,
      email: result.email,
      imageUrl: `${API_URL}/files/users/${result.imageUrl}`,
      location: result.location,
      bio: result.bio,
      // password: result.password,
      roles: result.roles,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt ? result.updatedAt : undefined,
    };
  }
}
