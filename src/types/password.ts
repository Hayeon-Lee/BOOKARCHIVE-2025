export interface PasswordResetRequest {
  id: string;
  newPassword: string;
  nickname: string;
  requestedAt: string;
  status: string;
}
