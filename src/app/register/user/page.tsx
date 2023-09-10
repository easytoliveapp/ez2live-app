import React from "react";
import Image from "next/image";
import Link from "next/link";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import FormComponent from "./FormComponent";
import Avatar from '@/images/easytolive/user/user_circle_color_primary.svg'
const UserRegisterPage = () => {
  const loginSocials = [
    {
      name: "Continuar com Facebook",
      href: "#",
      icon: facebookSvg,
    },
    {
      name: "Continuar com Google",
      href: "#",
      icon: googleSvg,
    },
  ];

  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-8 lg:mb-32">
        <div className='mt-8 mb-16 flex items-baseline justify-between'>
          <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
            Criar conta <br />
            \ usuário
          </h2>
          <div>
            <div className='flex rounded-full w-16 h-16 bg-gradient-to-r mr-2 from-secondary-500 to-secondary-200'>
              <Image src={Avatar} alt='avatar anonimo' className='m-auto w-8 h-auto' />
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <FormComponent />
          <span className="block text-center text-sm font-medium text-black dark:text-neutral-300">
            voltar para { }
            <Link className="text-primary-600 text-sm font-semibold" href="/login">
              login
            </Link>
          </span>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 justify-center flex font-semibold text-sm items-center w-full dark:text-neutral-400 dark:bg-neutral-900">
              <div className='bg-white h-0.5 w-full mr-4'></div>
              <p className='bg-primary-100 w-4 '>OU</p>
              <div className='bg-white h-0.5 w-full ml-4'></div>
            </span>
          </div>
          <div className="pt-2 grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className=" flex w-full rounded-full bg-white dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  sizes="40px"
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-black dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* ==== */}
          <span className=" block text-center text-sm font-medium text-black dark:text-neutral-300">
            <div className='bg-white h-0.5 w-auto m-auto mb-4'></div>
            <p> tem um estabelecimento e quer se juntar a nós? </p>
            <Link className="text-primary-600 text-sm font-semibold" href="/register/supplier">
              cadastre-se!
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
