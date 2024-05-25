export const getAccountType = (hasPremium?: boolean, hasTrial?: boolean) => {
  if (hasPremium) {
    return "Conta Premium";
  } else if (hasTrial) {
    return "Teste Premium";
  } else {
    return "Conta Gratuita";
  }
};
