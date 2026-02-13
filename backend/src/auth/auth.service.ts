import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginInput } from './login.input';
import { AuthResponse } from './auth.types';
import { Role } from './role.enum';
import { RegisterInput } from './register.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const role = user.role as Role;
    const payload = { sub: user.id, email: user.email, role };
    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role,
      },
    };
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    const email = input.email.toLowerCase();
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const role = input.role ?? Role.STORE_KEEPER;

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role as Role };
    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role as Role,
      },
    };
  }
}
