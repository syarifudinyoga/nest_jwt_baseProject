import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ParamsDto } from './dto/params.dto';
import { omit } from 'lodash';
import { compare } from 'bcrypt';
import { JwtConfig } from 'src/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dbService: PrismaService,
  ) {}

  /**
   * Register Service
   * @param dto
   * @returns
   */
  async register(dto: any) {
    const user = await this.dbService.users.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      throw new HttpException('User Exists', HttpStatus.BAD_REQUEST);
    }
    const createUser = await this.dbService.users.create({
      data: dto,
    });
    if (createUser) {
      return {
        statusCode: 200,
        message: 'Register success',
      };
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  /**
   * Login Service
   * @param dto
   * @returns
   */
  async login(dto: LoginDto) {
    const user = await this.dbService.users.findFirst({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(dto.password, user.password);
    if (!checkPassword) {
      throw new HttpException('Credential Incorrect', HttpStatus.UNAUTHORIZED);
    }
    return await this.generateJwt(
      user.id,
      user.email,
      user,
      JwtConfig.user_secret,
      JwtConfig.user_expired,
    );
  }

  /**
   * Generate JWT
   * @param userId
   * @param email
   * @param user
   * @param secret
   * @param expired
   * @returns
   */
  async generateJwt(
    userId: any,
    email: string,
    user: any,
    secret: any,
    expired = JwtConfig.user_expired,
  ) {
    const accessToken = await this.jwtService.sign(
      {
        sub: userId,
        email,
        name: user.first_name + ' ' + user.last_name,
      },
      {
        expiresIn: expired,
        secret,
      },
    );
    return {
      statusCode: 200,
      accessToken: accessToken,
      user: omit(user, ['password', 'created_at', 'updated_at']),
    };
  }

  /**
   * Get All User
   * @returns
   */
  async getAllUser() {
    const user = await this.dbService.users.findMany();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  /**
   * Get By ID
   * @param dto
   * @returns
   */
  async getById(dto: ParamsDto) {
    const user = await this.dbService.users.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  /**
   * Generate JWT
   * @param userId
   * @param email
   * @param user
   * @param secret
   * @param expired
   * @returns
   */
  async logout() {
    const accessToken = await this.jwtService.sign(
      {
        sub: '',
        email: '',
        name: '',
      },
      {
        expiresIn: '0s',
        secret: '',
      },
    );
    return {
      statusCode: 200,
      accessToken: accessToken,
      message: 'Logout Success',
    };
  }
}
