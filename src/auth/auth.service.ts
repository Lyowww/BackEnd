import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from './auth.guard';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async validateOAuthLogin(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async signup(signup: SignupDto) {
    const uniqueEmail = await this.userModel.findOne({ email: signup.email });
    if (uniqueEmail) throw new BadRequestException('User with this email already exists');

    const uniqueUsername = await this.userModel.findOne({ username: signup.username });
    if (uniqueUsername) throw new BadRequestException('User with this username already exists');

    const salt = await bcrypt.genSalt(10);
    signup.password = await bcrypt.hash(signup.password, salt);
    signup.code = Math.floor(1000 + Math.random() * 9000).toString();

    const user = await this.userModel.create(signup);

    await this.mailService.sendUserConfirmation(user);
  }

  async signin(signin: SigninDto) {
    const user = await this.userModel.findOne({
      confirmed: true,
      $or: [
        { email: signin.email },
        { username: signin.username }
      ]
    });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isCorrectPassword = await bcrypt.compare(signin.password, user.password);
    if (!isCorrectPassword) throw new UnauthorizedException('Invalid email or password');

    const accessToken = this.jwtService.sign({
      id: user.id,
      roles: user.roles
    });

    return { accessToken }
  }

  async confirm(code: string) {
    const user = await this.userModel.findOne({
      code,
      confirmed: false
    });
    if (!user) throw new BadRequestException('Incorrect credentials');

    user.code = undefined;
    user.confirmed = true;

    await user.save();
  }

  async forgotPassword(payload: JwtPayload, forgotPassword: ForgotPasswordDto) {
    if (!(forgotPassword.password === forgotPassword.passwordConfirm)) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.userModel.findOne({
      _id: payload.id,
      confirmed: true
    });
    if (!user) throw new UnauthorizedException();

    const isCorrectPassword = await bcrypt.compare(forgotPassword.oldPassword, user.password);
    if (!isCorrectPassword) throw new BadRequestException('Incorrect credentials');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(forgotPassword.password, salt);

    await user.save();
  }
}
