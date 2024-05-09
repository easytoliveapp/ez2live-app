export interface ICreditCardPayment {
  creditCard: string;
  cvv: string;
  fullName: string;
  cardMonth: string;
  cardYear: string;
  TermsOfUse: boolean;
}

export interface IPixPayment {
  cpf: string;
  TermsOfUse: boolean;
}
