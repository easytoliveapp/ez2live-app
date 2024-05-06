"use client";

import React, { useState, useCallback } from "react";
import classNames from "@/utils/classNames";
import { useSession } from "next-auth/react";
import { Security } from "./security";
import { Account } from "./account";
import { Signature } from "./signature";

const MyAccountPage = () => {
  const { data: session } = useSession();
  const [pageId, setPageId] = useState<"account" | "security" | "signature">(
    "account",
  );

  const tabComponents = {
    account: <Account session={session} />,
    security: <Security session={session} />,
    signature: <Signature session={session} />,
  };

  const TabComponent = useCallback(() => {
    return tabComponents[pageId] || tabComponents.account;
  }, [pageId]);

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="my-8 flex items-center justify-between max-w-4xl m-auto px-2">
        <h2 className=" flex flex-wrap items-center text-2xl leading-[115%] md:leading-[115%] font-bold text-black justify-center">
          {session?.user?.name}
        </h2>
        <div>
          <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-ligther">
            <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-ligther"></div>
          </div>
        </div>
      </div>
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <hr className="mt-10 border-slate-200 "></hr>
          <div className="mx-4 py-4 space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            <div className="flex gap-6">
              <div
                className={classNames(
                  "font-bold cursor-pointer text-black",
                  pageId === "account" ? "opacity-100" : "opacity-60",
                )}
                onClick={() => {
                  setPageId("account");
                }}
              >
                Conta
              </div>
              <div
                className={classNames(
                  "font-bold cursor-pointer text-black",
                  pageId === "security" ? "opacity-100" : "opacity-60",
                )}
                onClick={() => {
                  setPageId("security");
                }}
              >
                Segurança
              </div>
              <div
                className={classNames(
                  "font-bold cursor-pointer text-black",
                  pageId === "signature" ? "opacity-100" : "opacity-60",
                )}
                onClick={() => {
                  setPageId("signature");
                }}
              >
                Assinatura
              </div>
            </div>
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl h-full mx-auto pt-8 sm:pt-26 pb-12 lg:pb-12">
        <TabComponent />
      </div>
    </div>
  );
};

export default MyAccountPage;
