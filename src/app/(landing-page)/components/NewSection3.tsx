import React from "react";
import Image from "next/image";
import SupplierLocation from "../images/SuppliersLocation.png";
import PartnersSlider from "./PartnersSlider";
import { ButtonFourth } from "@/components";

const NewSection3 = () => {
  return (
    <div className="container">
      <h2 className="text-2xl md:text-3xl text-white text-center mb-10">
        Criamos um aplicativo com maiores e melhores lojas,
        <br /> naquele precinho e a poucos metros de você!
      </h2>
      <PartnersSlider />
      <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-20 p-6 py-14">
        <Image
          src={SupplierLocation}
          className=" w-56 md:w-[600px] rounded-full border-2 border-primary-main"
          alt="Supplier Location Map"
        />
        <ButtonFourth className=" px-6">GARANTIR ACESSO</ButtonFourth>
      </div>
    </div>
  );
};

export default NewSection3;
