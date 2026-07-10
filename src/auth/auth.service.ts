import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

async register(dto: RegisterDto) {
  const existing = await this.usersService.findByEmail(dto.email);

  if (existing) {
    throw new BadRequestException('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const user = await this.usersService.create({
    name: dto.name,
    email: dto.email,
    password: hashedPassword,
  });

  const { password, ...result } = user;

  return {
    success: true,
    message: 'User registered successfully',
    data: result,
  };
}

async login(dto: LoginDto) {
  const user = await this.usersService.findByEmail(dto.email);

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const valid = await bcrypt.compare(dto.password, user.password);

  if (!valid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const accessToken = this.jwtService.sign({
    sub: user.id,
    email: user.email,
  });

  return {
    success: true,
    message: 'Login successful',
    access_token: accessToken,
  };
}
}