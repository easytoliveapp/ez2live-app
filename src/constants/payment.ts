export const subscriptionCreditCardData = (iuguJsToken: any) => {
  return {
    plan_identifier: "ez2live_weekly",
    payable_with: "credit_card",
    token: iuguJsToken.id,
  };
};
