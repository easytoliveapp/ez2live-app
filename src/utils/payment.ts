import Alipay from "@/images/easytolive/payment/flags/alipay.svg";
import Amex from "@/images/easytolive/payment/flags/amex.svg";
import Dinner from "@/images/easytolive/payment/flags/diners.svg";
import Discover from "@/images/easytolive/payment/flags/discover.svg";
import Elo from "@/images/easytolive/payment/flags/elo.svg";
import HiperCard from "@/images/easytolive/payment/flags/hipercard.svg";
import JCB from "@/images/easytolive/payment/flags/jcb.svg";
import MasterCard from "@/images/easytolive/payment/flags/master-card.svg";
import Paypal from "@/images/easytolive/payment/flags/paypal.svg";
import UnionPay from "@/images/easytolive/payment/flags/unionpay.svg";
import Visa from "@/images/easytolive/payment/flags/visa.svg";

const isCreditCardExpirationValid = ({
  month,
  year,
}: {
  month: string;
  year: string;
}) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (parseInt(month) < currentMonth && parseInt(year) <= currentYear) {
    return false;
  }

  return true;
};

const getCardFlagImageByName = (flagName: string) => {
  if (flagName === "Visa") return Visa;
  if (flagName === "Unionpay") return UnionPay;
  if (flagName === "Paypal") return Paypal;
  if (flagName === "MasterCard") return MasterCard;
  if (flagName === "JCB") return JCB;
  if (flagName === "HiperCard") return HiperCard;
  if (flagName === "Elo") return Elo;
  if (flagName === "Discover") return Discover;
  if (flagName === "Diners") return Dinner;
  if (flagName === "Amex") return Amex;
  if (flagName === "Alipay") return Alipay;
};

const payment = {
  isCreditCardExpirationValid,
  getCardFlagImageByName,
};

export default payment;
