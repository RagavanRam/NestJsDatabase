import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ValidatorsService } from '../services/validators.service';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(private validatorsService: ValidatorsService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const params = req.params;
    this.validatorsService.setParams(params);
    return next.handle();
  }
}
