import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwksClient, { JwksClient } from 'jwks-rsa';
import { decode, verify } from 'jsonwebtoken';
import { Request } from 'express';
import { azureAdConfig } from './auth.config';
import type {
  JwtPayload,
  User,
  AuthenticatedRequest,
} from '../types/user.types';

@Injectable()
export class AzureAdAuthGuard implements CanActivate {
  private readonly client: JwksClient = jwksClient({
    jwksUri: azureAdConfig.jwksUri,
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('No Authorization header');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    const token = authHeader.slice(7);

    try {
      const publicKey = await this.getPublicKey(token);

      const payload = verify(token, publicKey, {
        issuer: azureAdConfig.issuer,
        audience: azureAdConfig.audience,
      }) as JwtPayload;

      if (typeof payload !== 'object' || payload === null) {
        throw new UnauthorizedException('Invalid token payload');
      }

      // Extract user information from token
      const user: User = {
        id: payload.oid,
        name: payload.name || 'Unknown User',
        email: payload.email || payload.preferred_username || '',
      };

      // Attach user and token to request
      request.user = user;
      request.token = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error instanceof Error ? error.message : 'Invalid token',
      );
    }
  }

  private async getPublicKey(token: string): Promise<string> {
    const decoded = decode(token, { complete: true });

    if (!decoded || typeof decoded === 'string') {
      throw new UnauthorizedException('Invalid token');
    }

    const key = await this.client.getSigningKey(decoded.header.kid);
    return key.getPublicKey();
  }
}
