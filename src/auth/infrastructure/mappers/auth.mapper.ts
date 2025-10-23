import type { AuthAPIResponse } from "@/auth/infrastructure/dto/response/auth-api.response";
import type { Session } from "@/auth/domain/interfaces/session.interface";
import { UserMapper } from "./user.mapper";

export class AuthMapper {
  static toDomainSession(result: AuthAPIResponse): Session {
    const user = UserMapper.toDomainSingle(result.user);

    return {
      token: result.token,
      user,
    };
  }
}
