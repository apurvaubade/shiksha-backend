import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "src/user/entities/user-entity";
import { Role } from "../../role/entities/role.entity";

@Entity({ name: "UserRolesMapping" })
export class UserRoleMapping {
  @PrimaryGeneratedColumn("uuid")
  Id: string;

  @Column("uuid")
  userId: string;

  @Column("uuid")
  roleId: string;

  @ManyToOne(() => User, (user) => user.userRoleMappings)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "roleId" })
  role: Role;
}
