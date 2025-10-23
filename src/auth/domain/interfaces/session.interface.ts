import type { User } from "@/auth/domain/entities/user.entity";

export interface Session {
  token: string;
  user: User;
}
