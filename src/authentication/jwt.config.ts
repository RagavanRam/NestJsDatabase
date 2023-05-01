import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtSecretOrKey = () => ({ secret: process.env.JWT_SECRET });

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: jwtSecretOrKey().secret,
      signOptions: { expiresIn: '7d' },
    };
  },
};
