import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authorization, Permission, Role } from './entities';
import { User } from 'src/users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, Authorization, User])],
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
