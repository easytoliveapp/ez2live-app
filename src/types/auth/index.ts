export interface ILogIn {
  email: string;
  password: string;
}

interface IAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
}
export interface IRegisterAccount {
  email: string;
  password: string;
  name: string;
  isSupplier?: boolean;
  address: IAddress;
  document?: string;
}
