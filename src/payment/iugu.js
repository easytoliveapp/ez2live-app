import { useEffect } from "react";

const Iugu = {
  impl() {
    if (!window.Iugu) {
      throw new Error("Iugu script has not been loaded yet.");
    }

    return window.Iugu;
  },
  setAccountToken(token) {
    this.impl().setAccountID(token);
  },
  setTestMode(mode) {
    this.impl().setTestMode(mode);
  },
  createPaymentToken(cardData, throwOnError = false) {
    return new Promise((resolve, reject) => {
      this.impl().createPaymentToken(cardData, (response) => {
        if (response.errors && throwOnError) {
          return reject(response);
        }

        resolve(response);
      });
    });
  },
};

export default function useIugu(accountId) {
  useEffect(() => {
    if (document.getElementById("iugu-script")) {
      Iugu.setAccountToken(accountId);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.iugu.com/v2";
    script.id = "iugu-script";

    script.onload = () => {
      Iugu.setAccountToken(accountId);
    };

    document.head.appendChild(script);

    return () => document.getElementById("iugu-script").remove();
  }, [accountId]);

  return Iugu;
}
