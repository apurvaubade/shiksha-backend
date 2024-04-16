import {
  ApiTags,
  ApiBody,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiHeader,
  ApiOkResponse,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Headers,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CohortMembersSearchDto } from "./dto/cohortMembers-search.dto";
import { Request } from "@nestjs/common";
import { CohortMembersDto } from "./dto/cohortMembers.dto";
import { CohortMembersAdapter } from "./cohortMembersadapter";
import { CohortMembersService } from "./cohortMember.service";
// import { Response } from "@nestjs/common";
import { CohortMembersUpdateDto } from "./dto/cohortMember-update.dto";
import { JwtAuthGuard } from "src/common/guards/keycloak.guard";
import { Response } from "express";

@ApiTags("Cohort Members")
@Controller("cohortmembers")
@UseGuards(JwtAuthGuard)
export class CohortMembersController {
  constructor(
    private readonly cohortMembersService: CohortMembersService,
    private readonly cohortMemberAdapter: CohortMembersAdapter
  ) {}

  //create cohort members
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Cohort Members has been created successfully.",
  })
  @ApiBody({ type: CohortMembersDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  // @UseInterceptors(ClassSerializerInterceptor)
  @ApiHeader({
    name: "tenantid",
  })
  public async createCohortMembers(
    @Headers() headers,
    @Req() request: Request,
    @Body() cohortMembersDto: CohortMembersDto,
    @Res() response: Response
  ) {
    let tenantid = headers["tenantid"];
    const payload = {
      tenantId: tenantid,
    };
    Object.assign(cohortMembersDto, payload);

    // return this.cohortMembersService.createCohortMembers(
    //   request,
    //   cohortMembersDto,
    //   response
    // );

    const result = await this.cohortMemberAdapter
      .buildCohortMembersAdapter()
      .createCohortMembers(request, cohortMembersDto, response);
    return response.status(result.statusCode).json(result);
  }

  //get cohort members
  @Get("/:id")
  // @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Cohort Members detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  @ApiHeader({
    name: "tenantid",
  })
  public async getCohortMembers(
    @Headers() headers,
    @Param("cohortMemberId") cohortMemberId: string,
    @Req() request: Request,
    @Res() response: Response
  ) {
    let tenantid = headers["tenantid"];

    const result = await this.cohortMemberAdapter
      .buildCohortMembersAdapter()
      .getCohortMembers(tenantid, cohortMemberId, response, request);
    return response.status(result.statusCode).json(result);
  }

  search;
  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Cohort Members list." })
  @ApiBody({ type: CohortMembersSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  @ApiHeader({
    name: "tenantid",
  })
  public async searchCohortMembers(
    @Headers() headers,
    @Req() request: Request,
    @Res() response: Response,
    @Body() cohortMembersSearchDto: CohortMembersSearchDto
  ) {
    let tenantid = headers["tenantid"];
    // return this.cohortMembersService.searchCohortMembers(
    //   tenantid,
    //   request,
    //   cohortMembersSearchDto,
    //   response
    // );

    const result = await this.cohortMemberAdapter
      .buildCohortMembersAdapter()
      .searchCohortMembers(tenantid, request, cohortMembersSearchDto, response);
    return response.status(result.statusCode).json(result);
  }

  //update
  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Cohort Members has been updated successfully.",
  })
  @ApiBody({ type: CohortMembersUpdateDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  // @UseInterceptors(ClassSerializerInterceptor)
  public async updateCohortMembers(
    @Param("id") cohortMembersId: string,
    @Req() request: Request,
    @Body() cohortMemberUpdateDto: CohortMembersUpdateDto,
    @Res() response: Response
  ) {
    const result = await this.cohortMemberAdapter
      .buildCohortMembersAdapter()
      .updateCohortMembers(
        cohortMembersId,
        request,
        cohortMemberUpdateDto,
        response
      );
    return response.status(result.statusCode).json(result);
  }

  //delete
  @Delete("/:id")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Cohort member deleted successfully" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  @ApiHeader({
    name: "tenantid",
  })
  public async deleteCohortMember(
    @Headers() headers,
    @Param("id") cohortMembershipId: string,
    @Req() request: Request,
    @Res() response: Response
  ) {
    let tenantid = headers["tenantid"];

    const result = await this.cohortMemberAdapter
      .buildCohortMembersAdapter()
      .deleteCohortMemberById(tenantid, cohortMembershipId, response, request);
    return response.status(result.statusCode).json(result);
  }
}
