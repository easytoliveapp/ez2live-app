export interface ICreditCardPayment {
  creditCard: string;
  cvv: string;
  fullName: string;
  cardMonth: string;
  cardYear: string;
  termsOfUse: boolean;
}

export interface IPixPayment {
  cpf: string;
  termsOfUse: boolean;
}

export interface IPixResponseData {
  qrCodeValue: { image: string; text: string };
  invoiceId: string;
}
