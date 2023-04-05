import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ParamsDto } from './dto/params.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TransformPasswordPipe } from './transform-password.pipe';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  /**
   * Constructor
   * @param authService
   */
  constructor(private authService: AuthService) {}

  /**
   * Register controller
   * @param dto
   * @returns
   */
  @UsePipes(ValidationPipe, TransformPasswordPipe)
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  /**
   * Login Controller
   * @param dto
   * @returns
   */
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  /**
   * Get detail User
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Body() dto: ParamsDto) {
    return await this.authService.getById(dto);
  }

  /**
   * Get All Data User
   */
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async user() {
    return await this.authService.getAllUser();
  }

  /**
   * Logout
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return await this.authService.logout();
  }
}
