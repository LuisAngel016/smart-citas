import { User } from '../entities/user.entity';

export interface UserPage {
  data: User[];
  total: number;
}
