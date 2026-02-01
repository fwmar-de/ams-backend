import { Controller, Get, UseGuards } from '@nestjs/common';
import { AzureAdAuthGuard } from '../auth/auth.guard';
import { CurrentUser, CurrentToken } from '../decorators';
import type { User, JwtPayload } from '../types';

@Controller('user')
export class UserController {
  /**
   * Get current user profile
   * Requires authentication
   */
  @Get('profile')
  @UseGuards(AzureAdAuthGuard)
  getProfile(@CurrentUser() user: User) {
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
  getCurrentUser(@CurrentUser() user: User, @CurrentToken() token: JwtPayload) {
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
