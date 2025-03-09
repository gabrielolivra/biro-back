
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
  
    if (user[0]?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user[0].id, username: user[0].username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
