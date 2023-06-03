import { Role } from './Role';
import { User } from './User';

export interface RoleForUser {
  id: number;
  User: User;
  userId: number;
  Role: Role;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
