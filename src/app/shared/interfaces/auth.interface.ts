export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface Registration {
  email: string;
  password: string;
  fullName?: string;
}
