export interface ILogIn {
  email: string;
  password: string;
};

export interface IRegisterAccount {
  email: string;
  password: string;
  name: string;
  isSupplier: boolean;
  address: {};
  document?: string;
};
