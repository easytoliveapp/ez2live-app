export interface IUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  active: boolean;
  isSupplier: boolean;
  isVerified: boolean;
}

export interface ITokens {
  access: IToken;
  refresh: IToken;
}

export interface IToken {
  token: string;
  expires: string;
}
export interface ILoginResponse {
  user: IUser;
  tokens: ITokens;
}
