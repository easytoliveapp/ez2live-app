import React from "react";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import Link from "next/link";
import FormComponent from './FormComponent';
const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin = () => {
  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-black dark:text-neutral-100 justify-center">
          Entrar
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <FormComponent/>
          <span className="flex justify-end  items-start text-sm">
            <Link className="text-primary-ez2live font-semibold" href="/">
              esqueci a senha
            </Link>
          </span>
          <span className="block text-center text-sm text-black font-semibold dark:text-neutral-300">
            nova conta? { }
            <Link className="text-primary-ez2live font-semibold" href="/register/user">
              criar conta
            </Link>
          </span>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-semibold text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OU
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  sizes="40px"
                />
                <h3 className="flex-grow text-center text-sm font-semibold text-black dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* ==== */}
          <span className=" block pt-10 text-center text-sm font-medium text-black dark:text-neutral-300">
            <p> tem um restaurante e quer se juntar a nós? </p>
            <Link className="text-primary-ez2live text-sm font-semibold" href="/register/supplier">
              cadastre-se!
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
