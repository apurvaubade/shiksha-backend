import { CohortMembers } from "src/cohortMembers/entities/cohort-member.entity";
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity({ name: "Users" })
export class User {
  @PrimaryColumn({ type: "uuid" })
  userId: string;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ type: "date", nullable: true })
  dob: Date;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  pincode: string;

  @CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column()
  mobile: number;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ type: "uuid" })
  tenantId: string;

  @Column({ default: "active" })
  status: string;
  userRoleMappings: User;

     @OneToMany(() => CohortMembers, cohortMembers => cohortMembers.user)
    cohortMembers: CohortMembers[];
}
