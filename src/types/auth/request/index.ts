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
  supplierInfo: {
    supplierCategory: string;
    address: IAddress;
  };
}
export interface IForgotPassword {
  email: string;
}
export interface IResetPassword {
  token: string;
  password: string;
}
export interface IResetPasswordForm {
  password: string;
  conf_password: string;
}
