export interface ILoginResponse {
    user: IUser;
    token: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
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
