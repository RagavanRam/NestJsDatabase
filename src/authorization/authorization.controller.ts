import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  CreateAuthorizationDto,
  CreatePermissionDto,
  CreateRoleDto,
  UpdateAuthorizationDto,
  UpdateMultiAuthorizationDto,
  UpdatePermissionDto,
  UpdateRoleDto,
} from './dto';
import { AuthorizationService } from './authorization.service';
import { Authorization, Permission, Role } from './entities';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { AuthorizationGuard } from 'src/core/guards';
import { Authorization as AuthorizationDecorator } from 'src/core/decorators';

@Controller('authorization')
@UseGuards(JwtAuthGuard, AuthorizationGuard)
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  // role api
  @AuthorizationDecorator(['roles', 'create'])
  @Post('role')
  createRole(
    @Body() createRoleDto: CreateRoleDto,
    @Request() req: any,
  ): Promise<Role> {
    return this.authorizationService.createRole(createRoleDto, req);
  }

  @AuthorizationDecorator(['roles', 'read'])
  @Get('role')
  findAllRole(): Promise<Role[]> {
    return this.authorizationService.findAllRole();
  }

  @AuthorizationDecorator(['roles', 'read'])
  @Get('role/:id')
  findOneRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.authorizationService.findOneRole(id);
  }

  @AuthorizationDecorator(['roles', 'update'])
  @Patch('role/:id')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @Request() req: any,
  ): Promise<Role> {
    return this.authorizationService.updateRole(id, updateRoleDto, req);
  }

  @AuthorizationDecorator(['roles', 'delete'])
  @Delete('role/:id')
  removeRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.authorizationService.removeRole(id);
  }

  // permission api
  @AuthorizationDecorator(['permissions', 'create'])
  @Post('permission')
  createPermission(
    @Body() createPermissionDto: CreatePermissionDto,
    @Request() req: any,
  ): Promise<Permission> {
    return this.authorizationService.createPermission(createPermissionDto, req);
  }

  @AuthorizationDecorator(['permissions', 'read'])
  @Get('permission')
  findAllPermission(): Promise<Permission[]> {
    return this.authorizationService.findAllPermission();
  }

  @AuthorizationDecorator(['permissions', 'read'])
  @Get('permission/:id')
  findOnePermission(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Permission> {
    return this.authorizationService.findOnePermission(id);
  }

  @AuthorizationDecorator(['permissions', 'update'])
  @Patch('permission/:id')
  updatePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @Request() req: any,
  ): Promise<Permission> {
    return this.authorizationService.updatePermission(
      id,
      updatePermissionDto,
      req,
    );
  }

  @AuthorizationDecorator(['permissions', 'delete'])
  @Delete('permission/:id')
  removePermission(@Param('id', ParseIntPipe) id: number): Promise<Permission> {
    return this.authorizationService.removePermission(id);
  }

  // authorization api
  @AuthorizationDecorator(['authorizations', 'create'])
  @Post()
  createAuthorization(
    @Body() createAuthorizationDto: CreateAuthorizationDto,
    @Request() req: any,
  ): Promise<Authorization> {
    return this.authorizationService.createAuthorization(
      createAuthorizationDto,
      req,
    );
  }

  @AuthorizationDecorator(['authorizations', 'create'])
  @Post('multi')
  createMultiAuthorization(
    @Body() createMultiAuthorizationDto: CreateAuthorizationDto[],
    @Request() req: any,
  ): Promise<Authorization[]> {
    return this.authorizationService.createMultiAuthorization(
      createMultiAuthorizationDto,
      req,
    );
  }

  @AuthorizationDecorator(['authorizations', 'read'])
  @Get()
  findAllAuthorization(): Promise<Authorization[]> {
    return this.authorizationService.findAllAuthorization();
  }

  @AuthorizationDecorator(['authorizations', 'read'])
  @Get(':id')
  findOneAuthorization(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Authorization> {
    return this.authorizationService.findOneAuthorization(id);
  }

  @AuthorizationDecorator(['authorizations', 'update'])
  @Patch(':id')
  updateAuthorization(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorizationDto: UpdateAuthorizationDto,
    @Request() req: any,
  ): Promise<Authorization> {
    return this.authorizationService.updateAuthorization(
      id,
      updateAuthorizationDto,
      req,
    );
  }

  @AuthorizationDecorator(['authorizations', 'update'])
  @Patch('multi')
  updateMultiAuthorization(
    @Body() updateMultiAuthorizationDto: UpdateMultiAuthorizationDto[],
    @Request() req: any,
  ): Promise<Authorization[]> {
    return this.authorizationService.updateMultiAuthorization(
      updateMultiAuthorizationDto,
      req,
    );
  }

  @AuthorizationDecorator(['authorizations', 'delete'])
  @Delete(':id')
  removeAuthorization(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Authorization> {
    return this.authorizationService.removeAuthorization(id);
  }

  @AuthorizationDecorator(['authorizations', 'delete'])
  @Delete('multi')
  removeMultiAuthorization(@Body() data: number[]): Promise<Authorization[]> {
    return this.authorizationService.removeMultiAuthorization(data);
  }
}
