/**
 * User data from Azure AD token claims
 */
export interface AzureAdUser {
  oid: string;
  name: string;
  email: string;
}

/**
 * Azure AD ID Token Claims
 */
export interface AzureAdTokenClaims {
  oid: string; // Object ID - unique user identifier
  name?: string;
  email?: string;
  preferred_username?: string;
  aud: string; // Audience
  iss: string; // Issuer
  iat: number; // Issued at
  exp: number; // Expiration time
  sub: string; // Subject
}

/**
 * JWT Payload with Azure AD claims
 */
export interface JwtPayload extends AzureAdTokenClaims {
  [key: string]: unknown;
}

/**
 * Request with authenticated user
 */
export interface AuthenticatedRequest extends Request {
  user?: AzureAdUser;
  token?: JwtPayload;
}
