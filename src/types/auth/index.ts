export interface ILogIn {
  email: string;
  password: string;
}

export interface IAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
}
export interface IRegisterAccount { 
  name: string;
  email: string;
  password: string;
  document: string;
  address: IAddress;
  supplierCategory: string;
  isSupplier: boolean;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
}