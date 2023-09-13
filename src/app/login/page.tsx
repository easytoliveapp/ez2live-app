import React from "react";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import Link from "next/link";
import FormComponent from './FormComponent';
const loginSocials = [
  {
    name: 'Continuar com Facebook',
    href: '#',
    icon: facebookSvg,
  },
  {
    name: 'Continuar com Google',
    href: '#',
    icon: googleSvg,
  },
];

const PageLogin = () => {
  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-8 lg:mb-32">
        <div className='mt-8 mb-16 flex items-center justify-between'>
          <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
            Entrar
          </h2>
          <div>
            <div className='relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-500 to-secondary-200'>
              <div className='absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-200'>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <FormComponent/>
          <span className="block text-center text-sm text-black font-semibold">
            nova conta? { }
            <Link className="text-primary-600 font-semibold" href="/register/user">
              criar conta
            </Link>
          </span>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 justify-center flex font-semibold text-sm items-center w-full">
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
                className="flex w-full rounded-full bg-white px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  sizes="40px"
                />
                <h3 className="flex-grow text-center text-sm font-semibold text-black sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* ==== */}
          
          <span className=" block pt-6 text-center text-sm font-medium text-black">
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

export default PageLogin;
