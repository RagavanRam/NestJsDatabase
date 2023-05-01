import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthorizationModule, CoreModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
