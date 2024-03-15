import React from "react";
import Image from "next/image";
import SupplierLocation from "../images/SuppliersLocation.png";
import { ButtonFourth } from "@/components";

const NewSection3 = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-20 p-6 py-14 md:pt-32">
      <h2 className="text-2xl">
        Criamos um aplicativo com maiores e melhores lojas, naquele precinho e a
        poucos metros de você!
      </h2>
      <Image
        src={SupplierLocation}
        className=" w-56 md:w-[400px]  rounded-full"
        alt="Supplier Location Map"
      />
      <ButtonFourth className=" px-6">GARANTIR ACESSO</ButtonFourth>
    </div>
  );
};

export default NewSection3;
