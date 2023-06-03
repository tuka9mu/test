import { Role } from "./Role"
import { RoleForUser } from "./RoleForUser"

export interface User {
  id?: number
  username?: string
  password?: string
  role?:RoleForUser[]
}
