"use client";

import React, { useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";

const loginSocials = [
  {
    name: "Continue with Facebook",
    provider: "facebook",
    icon: facebookSvg,
  },
  {
    name: "Continue with Google",
    provider: "google",
    icon: googleSvg,
  },
];

const SocialLoginComponent = () => {
  const [loading, setLoading] = useState(false);

  const nextAuthLoginBasedOnProvider = (provider: string) => {
    setLoading(true);

    signIn(provider, { callbackUrl: "/" })
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="pt-2 grid gap-3">
      {loginSocials.map((item, index) => (
        <button
          key={index}
          className="flex w-full rounded-full bg-white dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
          onClick={() => nextAuthLoginBasedOnProvider(item.provider)}
          disabled={loading}
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
        </button>
      ))}
    </div>
  );
};

export default SocialLoginComponent;
