export interface LogInType {
  email:string;
  password: string;
};

export interface RegisterAccountType {
  email: string;
  password: string;
  name: string;
  isSupplier: boolean;
  address: {};
  document?: string;
};
