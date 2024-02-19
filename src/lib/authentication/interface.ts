export interface IAuthResponse {
  sessionId: string;
  userId: number;
  message: string;
  error: string;
}

export interface AuthenticationInterface {
  login(email: string, password: string): Promise<Partial<IAuthResponse>>;
  logout(): Promise<Partial<IAuthResponse>>;
  checkSession(): Promise<Partial<IAuthResponse>>;
}
