export interface ICreditCardPayment {
  cardNumber: string;
  cvv: string;
  full_name: string;
  cardMonth: string;
  cardYear: string;
  TermsOfUse: boolean;
}

export interface IPixPayment {
  cpf: string;
  TermsOfUse: boolean;
}
