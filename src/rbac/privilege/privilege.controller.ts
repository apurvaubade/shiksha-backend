import { PrivilegeDto } from "./dto/privilege.dto";
import { UpdatePrivilegeDto } from "./dto/update-privilege.dto";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  SerializeOptions,
  Req,
  UsePipes,
  ValidationPipe,
  Res,
  Headers,
  Delete,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiHeader,
} from "@nestjs/swagger";
import { Request } from "@nestjs/common";
import { Response, response } from "express";
import { JwtAuthGuard } from "src/common/guards/keycloak.guard";
import { PrivilegeAdapter } from "./privilegeadapter";

@UseGuards(JwtAuthGuard)
@ApiTags("rbac")
@Controller("privilege")
export class PrivilegeController {
  constructor(private readonly privilegeAdapter: PrivilegeAdapter) {}

  @Get("/:privilegeId")
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Privilege Detail." })
  @ApiHeader({ name: "tenantid" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({ strategy: "excludeAll" })
  public async getPrivilege(
    @Param("privilegeId") privilegeId: string,
    @Req() request: Request,
    @Res() response: Response
  ) {
    const result = await this.privilegeAdapter
      .buildPrivilegeAdapter()
      .getPrivilege(privilegeId, request);
    return response.status(result.statusCode).json(result);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Privilege has been created successfully.",
  })
  @ApiBody({ type: PrivilegeDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiHeader({ name: "tenantid" })
  public async createPrivilege(
    @Req() request: Request,
    @Body() privilegeDto: PrivilegeDto,
    @Res() response: Response
  ) {
    const result = await this.privilegeAdapter
      .buildPrivilegeAdapter()
      .createPrivilege(request, privilegeDto);
    return response.status(result.statusCode).json(result);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Role updated successfully." })
  @ApiBody({ type: PrivilegeDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiHeader({ name: "tenantid" })
  public async updatePrivilege(
    @Param("id") privilegeId: string,
    @Req() request: Request,
    @Body() privilegeDto: PrivilegeDto,
    @Res() response: Response
  ) {
    const result = await this.privilegeAdapter
      .buildPrivilegeAdapter()
      .updatePrivilege(privilegeId, request, privilegeDto);
    return response.status(result.statusCode).json(result);
  }

  @Get()
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Privilege Detail." })
  @ApiHeader({ name: "tenantid" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({ strategy: "excludeAll" })
  public async getAllPrivilege(
    @Req() request: Request,
    @Res() response: Response
  ) {
    const result = await this.privilegeAdapter
      .buildPrivilegeAdapter()
      .getAllPrivilege(request);
    return response.status(result.statusCode).json(result);
  }

  @Delete("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Role updated successfully." })
  @ApiBody({ type: PrivilegeDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiHeader({ name: "tenantid" })
  public async deletePrivilege(
    @Param("id") privilegeId: string,
    @Req() request: Request,
    @Body() privilegeDto: PrivilegeDto,
    @Res() response: Response
  ) {
    const result = await this.privilegeAdapter
      .buildPrivilegeAdapter()
      .deletePrivilege(privilegeId, request, privilegeDto);
    return response.status(result.statusCode).json(result);
  }
}
