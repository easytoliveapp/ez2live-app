export interface ISubscriptionIuguService {
  plan_identifier: string;
  payable_with: "pix" | "credit_card";
  payer_cpf_cnpj: string;
  token: string;
}

export const subscriptionCreditCardData = (iuguJsToken: any) => {
  return {
    plan_identifier: "ez2live_weekly",
    payable_with: "credit_card",
    token: iuguJsToken.id,
  };
};

export const subscriptionPixData = (cpfOrCnpj: string) => {
  return {
    plan_identifier: "ez2live_weekly",
    payable_with: "pix",
    payer_cpf_cnpj: cpfOrCnpj,
  };
};
