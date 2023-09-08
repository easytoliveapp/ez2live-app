import React from "react";
import Link from "next/link";

import FormComponent from "./FormComponent";

const UserForgotPasswordPage = () => {
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-8 lg:mb-32">
        <div className="mt-8 mb-16 flex items-center justify-between">
          <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
            Recuperar <br />
            senha
          </h2>
          <div>
            <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg">
              <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg"></div>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <FormComponent />
          <span className=" block text-center text-sm font-semibold text-black dark:text-neutral-300">
            voltar para {}
            <Link
              className="text-primary-ez2live text-sm font-semibold"
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

export default UserForgotPasswordPage;
