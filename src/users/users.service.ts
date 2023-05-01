import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CreateUserDto,
  ResetPasswordFinishDto,
  ResetPasswordInitDto,
  UpdateUserDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { EmailService } from 'src/core/services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private authorizationService: AuthorizationService,
    private emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto, req: any): Promise<User> {
    const saltOrRounds = 12;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const user = this.userRepo.create({ ...createUserDto, password: hash });
    user.createdBy = req.user.id;
    if (createUserDto.roleId)
      user.role = await this.authorizationService.findOneRole(
        createUserDto.roleId,
      );
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException('Not Found Error');
    return user;
  }

  async findUser(username: string): Promise<User> {
    return this.userRepo.findOne({ where: { username }, relations: ['role'] });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    req: any,
  ): Promise<User> {
    const user = await this.findOne(id);
    user.updatedBy = req.user.id;
    if (updateUserDto.roleId)
      user.role = await this.authorizationService.findOneRole(
        updateUserDto.roleId,
      );
    this.userRepo.merge(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
    return user;
  }

  async resetPasswordInit(
    resetPasswordInit: ResetPasswordInitDto,
  ): Promise<string> {
    const user = await this.userRepo.findOne({
      where: { email: resetPasswordInit.email },
    });

    if (!user)
      throw new NotFoundException(
        'No account associated with the provided email address.',
      );

    user.resetKey = uuidv4();
    await this.userRepo.save(user);

    const nodemailer = await this.emailService.sendResetPasswordMail(user);

    if (nodemailer.accepted.length)
      return 'An email with password reset instructions has been sent to the provided email';

    throw new InternalServerErrorException(
      'Error sending reset password email',
    );
  }

  async resetPasswordFinish(
    resetPasswordFinish: ResetPasswordFinishDto,
  ): Promise<string> {
    if (resetPasswordFinish.password !== resetPasswordFinish.confirmPassword)
      throw new UnprocessableEntityException(
        'Password and confirmation password do not match',
      );

    const user = await this.userRepo.findOne({
      where: { resetKey: resetPasswordFinish.resetKey },
    });

    if (!user)
      throw new NotFoundException(
        'No associated account for the provided reset key',
      );

    const hash = await bcrypt.hash(resetPasswordFinish.password, 12);
    await this.userRepo.save({ ...user, resetKey: null, password: hash });

    return 'Password reset request completed successfully';
  }
}
