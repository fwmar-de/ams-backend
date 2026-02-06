import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AzureAdAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser, CurrentToken } from 'src/decorators';
import type { AzureAdUser, JwtPayload } from 'src/types';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './dto';
import { User } from 'generated/prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<GetUserDto> {
    const newUser: User = await this.userService.createUser(dto);
    return new GetUserDto(newUser);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<GetUserDto> {
    const user = await this.userService.getUserById(id);
    return new GetUserDto(user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<GetUserDto> {
    const updatedUser: User = await this.userService.updateUser(id, dto);
    return new GetUserDto(updatedUser);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUserById(id);
  }

  /**
   * Get current user profile
   * Requires authentication
   */
  @Get('profile')
  @UseGuards(AzureAdAuthGuard)
  getProfile(@CurrentUser() user: AzureAdUser) {
    return {
      success: true,
      data: user,
    };
  }

  /**
   * Get current user with full token info
   * Requires authentication
   */
  @Get('me')
  @UseGuards(AzureAdAuthGuard)
  getCurrentUser(
    @CurrentUser() user: AzureAdUser,
    @CurrentToken() token: JwtPayload,
  ) {
    return {
      success: true,
      data: {
        user,
        tokenInfo: {
          issuer: token.iss,
          audience: token.aud,
          expiresAt: new Date(token.exp * 1000).toISOString(),
          issuedAt: new Date(token.iat * 1000).toISOString(),
        },
      },
    };
  }
}
