import { Module } from "@nestjs/common";
import { CohortMembersController } from "./cohortMembers.controller";
import { HttpModule } from "@nestjs/axios";
import { CohortMembersAdapter } from "./cohortMembersadapter";
import { HasuraModule } from "src/adapters/hasura/hasura.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CohortMembers } from "./entities/cohort-member.entity";
import { CohortMembersService } from "./cohortMember.service";
import { HasuraProgramService } from "src/adapters/hasura/rbac/program.adapter";
import { PostgresProgramService } from "src/adapters/postgres/rbac/program-adapter";
import { PostgresModule } from "src/adapters/postgres/potsgres-module";
import { PostgresCohortMembersService } from "src/adapters/postgres/cohortMembers-adapter";
import { HasuraCohortMembersService } from "src/adapters/hasura/cohortMembers.adapter";

@Module({
  imports: [
    TypeOrmModule.forFeature([CohortMembers]),
    HttpModule,
    HasuraModule,
    PostgresModule,
  ],
  controllers: [CohortMembersController],
  providers: [
    CohortMembersAdapter,
    CohortMembersService,
    PostgresCohortMembersService,
    HasuraCohortMembersService,
  ],
})
export class CohortMembersModule {}
