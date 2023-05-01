import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Patch,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/authentication/local-auth.guard';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';
import {
  CreateUserDto,
  ResetPasswordFinishDto,
  ResetPasswordInitDto,
} from './users/dto';

@Controller('auth')
export class AppController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req: any): any {
    return this.authenticationService.signin(req.user);
  }

  @Post('signup')
  create(
    @Body() createUserDto: CreateUserDto,
    @Request() req: any,
  ): Promise<User> {
    return this.usersService.create(createUserDto, req);
  }

  @Post('reset-password/init')
  resetPasswordInit(
    @Body() resetPasswordInit: ResetPasswordInitDto,
  ): Promise<string> {
    return this.usersService.resetPasswordInit(resetPasswordInit);
  }

  @Patch('reset-password/finish')
  resetPasswordFinish(
    @Body() resetPasswordFinish: ResetPasswordFinishDto,
  ): Promise<string> {
    return this.usersService.resetPasswordFinish(resetPasswordFinish);
  }
}
