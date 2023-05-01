import { Module } from '@nestjs/common';
import { ValidatorsService } from './services/validators.service';
import { EmailService } from './services/email.service';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [AuthorizationModule],
  providers: [ValidatorsService, EmailService],
  exports: [ValidatorsService, EmailService],
})
export class CoreModule {}
