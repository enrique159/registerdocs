export interface AuthParams {
  username: string
  password: string
}

export interface ChangePasswordParams {
  id: string
  oldPassword: string
  newPassword: string
}