import { RoleForUser } from "./RoleForUser";

export interface Role {
  id:number;
  name:string;
  roleForUser:RoleForUser;
  createdAt:Date;
  updatedAt:Date;
  isActive:boolean;
}
