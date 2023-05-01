/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  async signin(user: any) {
    const payload = {
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
