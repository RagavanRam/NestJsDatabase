import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { User } from './entities';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { AuthorizationGuard } from 'src/core/guards';
import { Authorization } from 'src/core/decorators';

@Controller('users')
@UseGuards(JwtAuthGuard, AuthorizationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Authorization(['users', 'read'])
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Authorization(['users', 'read'])
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Authorization(['users', 'update'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto, req);
  }

  @Authorization(['users', 'delete'])
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
