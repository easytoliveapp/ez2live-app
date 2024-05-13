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

export interface ISubscriptionIuguService {
  email: string;
  plan_identifier: string;
  payable_with: "pix" | "credit_card";
  player_cpf_cnpj: string;
  token: string;
}
