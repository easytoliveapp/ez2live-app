import React from "react";
import Image from "next/image";
import payment from "@/utils/payment";

interface CreditCardProps {
  lastNumbers: string;
  nameOnCard: string;
  cardFlag: string;
  year: number;
  month: number;
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardFlag,
  year,
  month,
  lastNumbers,
  nameOnCard,
}) => {
  return (
    <div className="w-48 h-full rounded-2xl   space-y-2 pl-5 pt-7 pb-3 pr-3 text-white from-[#9A79F7] to-[#411CA8] bg-gradient-to-br">
      <div className="text-xs font-black mb-1 text-start">
        **** **** ****{" "}
        {lastNumbers?.length === 4 ? lastNumbers : `**** ${lastNumbers}`}
      </div>
      <p className="text-xs text-start font-black">{nameOnCard}</p>
      <p className=" text-xs text-start">{month + "/" + year}</p>
      <div className="w-full flex justify-end">
        {
          <Image
            src={payment.getCardFlagImageByName(cardFlag)}
            alt="card-flag"
            width={18}
            height={14}
            className="bg-white flex justify-center items-center rounded-sm"
          />
        }
      </div>
    </div>
  );
};

export default CreditCard;
