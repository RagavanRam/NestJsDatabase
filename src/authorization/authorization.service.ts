import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authorization, Permission, Role } from './entities';
import { Repository } from 'typeorm';
import {
  CreateAuthorizationDto,
  CreatePermissionDto,
  CreateRoleDto,
  UpdateAuthorizationDto,
  UpdateMultiAuthorizationDto,
  UpdatePermissionDto,
  UpdateRoleDto,
} from './dto';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(Authorization)
    private authorizationRepo: Repository<Authorization>,
  ) {}

  // role api functionalities
  async createRole(createRoleDto: CreateRoleDto, req: any): Promise<Role> {
    const role = this.roleRepo.create(createRoleDto);
    role.createdBy = req.user.id;
    return this.roleRepo.save(role);
  }

  async findAllRole(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  async findOneRole(id: number): Promise<Role> {
    const role = await this.roleRepo.findOneBy({ id });
    if (!role) throw new NotFoundException();
    return role;
  }

  async updateRole(
    id: number,
    updateRoleDto: UpdateRoleDto,
    req: any,
  ): Promise<Role> {
    const role = await this.findOneRole(id);
    role.updatedBy = req.user.id;
    this.roleRepo.merge(role, updateRoleDto);
    return this.roleRepo.save(role);
  }

  async removeRole(id: number): Promise<Role> {
    const role = await this.findOneRole(id);
    await this.roleRepo.remove(role);
    return role;
  }

  // permission api functionalities
  async createPermission(
    createPermissionDto: CreatePermissionDto,
    req: any,
  ): Promise<Permission> {
    const permission = this.permissionRepo.create(createPermissionDto);
    permission.createdBy = req.user.id;
    return this.permissionRepo.save(permission);
  }

  async findAllPermission(): Promise<Permission[]> {
    return this.permissionRepo.find();
  }

  async findOnePermission(id: number): Promise<Permission> {
    const permission = await this.permissionRepo.findOneBy({ id });
    if (!permission) throw new NotFoundException();
    return permission;
  }

  async updatePermission(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
    req: any,
  ): Promise<Permission> {
    const permission = await this.findOnePermission(id);
    permission.updatedBy = req.user.id;
    this.permissionRepo.merge(permission, updatePermissionDto);
    return this.permissionRepo.save(permission);
  }

  async removePermission(id: number): Promise<Permission> {
    const permission = await this.findOnePermission(id);
    await this.permissionRepo.remove(permission);
    return permission;
  }

  // authorization api functionalities
  async createAuthorization(
    createAuthorizationDto: CreateAuthorizationDto,
    req: any,
  ): Promise<Authorization> {
    const roleId = createAuthorizationDto.roleId;
    const permissionId = createAuthorizationDto.permissionId;
    const isInValid = await this.ValideAuthorization(roleId, permissionId);
    if (isInValid) throw new BadRequestException();
    const role = await this.findOneRole(roleId);
    const permission = await this.findOnePermission(permissionId);
    const authorization = this.authorizationRepo.create({
      ...createAuthorizationDto,
      role,
      permission,
    });
    authorization.createdBy = req.user.id;
    return this.authorizationRepo.save(authorization);
  }

  async createMultiAuthorization(
    createMultiAuthorizationDto: CreateAuthorizationDto[],
    req: any,
  ): Promise<Authorization[]> {
    const authorizations = [];
    for (const authorization of createMultiAuthorizationDto) {
      const temp = await this.createAuthorization(authorization, req);
      authorizations.push(temp);
    }
    return authorizations;
  }

  async findAllAuthorization(): Promise<Authorization[]> {
    return this.authorizationRepo.find();
  }

  async findOneAuthorization(id: number): Promise<Authorization> {
    const authorization = await this.authorizationRepo.findOneBy({ id });
    if (!authorization) throw new NotFoundException();
    return authorization;
  }

  async updateAuthorization(
    id: number,
    updateAuthorizationDto: UpdateAuthorizationDto,
    req: any,
  ): Promise<Authorization> {
    const authorization = await this.findOneAuthorization(id);
    const roleId = updateAuthorizationDto.roleId;
    const permissionId = updateAuthorizationDto.permissionId;
    const isInValid = await this.ValideAuthorization(
      roleId,
      permissionId,
      authorization,
    );
    if (isInValid) throw new BadRequestException();
    authorization.updatedBy = req.user.id;
    if (roleId) authorization.role = await this.findOneRole(roleId);
    if (permissionId)
      authorization.permission = await this.findOnePermission(permissionId);
    this.authorizationRepo.merge(authorization, updateAuthorizationDto);
    return this.authorizationRepo.save(authorization);
  }

  async updateMultiAuthorization(
    updateMultiAuthorization: UpdateMultiAuthorizationDto[],
    req: any,
  ): Promise<Authorization[]> {
    const authorizations = [];
    for (const updateAuthorization of updateMultiAuthorization) {
      const temp = await this.updateAuthorization(
        updateAuthorization.id,
        updateAuthorization.updateData,
        req,
      );
      authorizations.push(temp);
    }
    return authorizations;
  }

  async removeAuthorization(id: number): Promise<Authorization> {
    const authorization = await this.findOneAuthorization(id);
    await this.authorizationRepo.remove(authorization);
    return authorization;
  }

  async removeMultiAuthorization(data: number[]): Promise<Authorization[]> {
    const authorizations = [];
    for (const id of data) {
      const temp = await this.removeAuthorization(id);
      authorizations.push(temp);
    }
    return authorizations;
  }

  async ValideAuthorization(
    roleId: number,
    permissionId: number,
    authorization?: Authorization,
  ): Promise<boolean> {
    if (roleId && permissionId)
      return !!(await this.authorizationRepo.findOne({
        where: { role: { id: roleId }, permission: { id: permissionId } },
      }));
    else if (roleId && !permissionId && authorization)
      return !!(await this.authorizationRepo.findOne({
        where: {
          role: { id: roleId },
          permission: { id: authorization.permission.id },
        },
      }));
    else if (!roleId && permissionId && authorization)
      !!(await this.authorizationRepo.findOne({
        where: {
          role: { id: authorization.role.id },
          permission: { id: permissionId },
        },
      }));
    else return false;
  }

  // validate authorization
  async validate(
    roleId: number,
    permissionName: string,
    permission: string,
  ): Promise<boolean> {
    if (!roleId) return false;
    const authorization = await this.authorizationRepo.findOne({
      where: { role: { id: roleId }, permission: { name: permissionName } },
    });
    if (!authorization) return false;
    const isManageActive = authorization.manage;
    if (isManageActive) return true;
    const permissionActive = authorization[permission];
    return permissionActive;
  }
}
