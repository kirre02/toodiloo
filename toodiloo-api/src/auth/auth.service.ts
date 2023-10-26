import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.UserService.getUser({ email: email });

    if (!user) throw new NotAcceptableException('user was not found');

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) throw new UnauthorizedException('invalid password');

    if (user && passwordIsValid) return { user: user.name };

    return null;
  }
}
