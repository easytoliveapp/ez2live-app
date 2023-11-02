import React from "react";
import Image from "next/image";
import Link from "next/link";
import FormComponent from "./FormComponent";
import Avatar from "@/images/easytolive/user/user_circle_color_primary.svg";
import SocialLoginComponent from "../../../../../../../components/mols/SocialLoginComponent";

const UserRegisterPage = () => {
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-8 lg:mb-32">
        <div className="mt-8 mb-16 flex items-baseline justify-between">
          <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black justify-center">
            Criar conta <br />\ usuário
          </h2>
          <div>
            <div className="flex rounded-full w-16 h-16 bg-gradient-to-r mr-2 from-secondary-main to-secondary-lighter">
              <Image
                src={Avatar}
                alt="avatar anonimo"
                className="m-auto w-8 h-auto"
              />
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <FormComponent />
          <span className="block text-center text-sm font-medium text-black">
            voltar para {}
            <Link
              className="text-primary-main text-sm font-semibold"
              href="/auth/login"
            >
              login
            </Link>
          </span>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 justify-center flex font-semibold text-sm items-center w-full">
              <div className="bg-white h-0.5 w-full mr-4"></div>
              <p className="bg-generic-background w-4 ">OU</p>
              <div className="bg-white h-0.5 w-full ml-4"></div>
            </span>
          </div>
          <div className="pt-2 grid gap-3">
            <SocialLoginComponent />
          </div>
          {/* ==== */}
          <span className=" block text-center text-sm font-medium text-black">
            <div className="bg-white h-0.5 w-auto m-auto mb-4"></div>
            <p> tem um estabelecimento e quer se juntar a nós? </p>
            <Link
              className="text-primary-main text-sm font-semibold"
              href="/auth/register/supplier"
            >
              cadastre-se!
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
