import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AttendanceHasuraService } from "./attendance.adapter";
import { HasuraConfigService } from "./config.adapter";
import { HasuraCohortService } from "./cohort.adapter";
import { HasuraCohortMembersService } from "./cohortMembers.adapter";
import { HasuraFieldsService } from "./fields.adapter";
import { FieldsService } from "./services/fields.service";
import { HasuraUserService } from "./user.adapter";

@Module({
  imports: [HttpModule],
  providers: [
    AttendanceHasuraService,
    HasuraCohortService,
    HasuraCohortMembersService,
    HasuraConfigService,
    HasuraFieldsService,
    FieldsService,
    HasuraUserService,
  ],
  exports: [
    AttendanceHasuraService,
    HasuraCohortService,
    HasuraCohortMembersService,
    HasuraConfigService,
    HasuraFieldsService,
    HasuraUserService,
  ],
})
export class HasuraModule {}
