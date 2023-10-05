import React from "react";
import Link from "next/link";
import Image from "next/image";
import FormComponent from "./FormComponent";
import Supplier from "@/images/easytolive/home/home_4.svg";

const SupplierRegisterPage = () => {
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <div className="mt-8 mb-16 flex items-baseline justify-between">
          <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
            Criar conta <br />\ estabelecimento
          </h2>
          <div>
            <div className="flex rounded-full mr-2 w-16 h-16 bg-gradient-to-r from-primary-main to-primary-lighter">
              <Image
                src={Supplier}
                alt="avatar anonimo"
                className="m-auto w-8 h-auto"
              />
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <FormComponent />
          {/* ==== */}
          <span className="block text-center text-black font-medium dark:text-neutral-300">
            voltar para {}
            <Link
              className="text-primary-main font-semibold"
              href="/auth/login"
            >
              login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupplierRegisterPage;
