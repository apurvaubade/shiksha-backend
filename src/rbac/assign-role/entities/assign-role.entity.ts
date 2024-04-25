import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../../role/entities/rbac.entity";

@Entity({ name: "UserRolesMapping" })
export class UserRoleMapping {
  @PrimaryGeneratedColumn("uuid")
  userRolesId: string;

  @Column("uuid")
  userId: string;

  @Column("uuid")
  roleId: string;

  @Column("uuid")
  createdBy: string;

  @Column("uuid")
  updatedBy: string;

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
