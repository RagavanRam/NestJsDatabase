import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecretOrKey } from './jwt.config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecretOrKey().secret,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.id);
    return {
      iserId: payload.sub,
      roleId: user.role?.id,
    };
  }
}
