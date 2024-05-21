import React from "react";
import MasterCardFlag from "@/images/easytolive/payment/master-card.svg";
import Image from "next/image";

interface CreditCardProps {
  lastNumbers: string;
  nameOnCard: string;
  expirationDate: string;
  cardFlag: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardFlag,
  expirationDate,
  lastNumbers,
  nameOnCard,
}) => {
  return (
    <div className="w-48 h-full rounded-2xl   space-y-2 pl-5 pt-7 pb-3 pr-3 text-white from-[#9A79F7] to-[#411CA8] bg-gradient-to-br">
      <div className="text-xs font-black mb-1 text-start">
        **** **** ****{" "}
        {lastNumbers.length === 4 ? lastNumbers : `**** ${lastNumbers}`}
      </div>
      <p className="text-xs text-start font-black">{nameOnCard}</p>
      <p className=" text-xs text-start">{expirationDate}</p>
      <div className="w-full flex justify-end">
        {cardFlag && (
          <Image src={MasterCardFlag} alt="card-flag" width={18} height={14} />
        )}
      </div>
    </div>
  );
};

export default CreditCard;
