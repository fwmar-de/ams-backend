import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthenticatedRequest, User } from '../types/user.types';

/**
 * Decorator to extract the current authenticated user from the request
 * Use with @UseGuards(AzureAdAuthGuard) to ensure user is authenticated
 *
 * @example
 * ```typescript
 * @Get('profile')
 * @UseGuards(AzureAdAuthGuard)
 * getProfile(@CurrentUser() user: User) {
 *   return user;
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | undefined => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);

/**
 * Decorator to extract the JWT token payload from the request
 * Use with @UseGuards(AzureAdAuthGuard) to ensure token is verified
 *
 * @example
 * ```typescript
 * @Get('token-info')
 * @UseGuards(AzureAdAuthGuard)
 * getTokenInfo(@CurrentToken() token: JwtPayload) {
 *   return { iss: token.iss, exp: token.exp };
 * }
 * ```
 */
export const CurrentToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.token;
  },
);
