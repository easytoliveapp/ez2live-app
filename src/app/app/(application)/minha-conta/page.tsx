"use client";

import React, { useState, useMemo, useEffect } from "react";
import classNames from "@/utils/classNames";
import { useSession } from "next-auth/react";
import { Security } from "./security";
import { Account } from "./account";
import { Signature } from "./subscription";
import { useSearchParams } from "next/navigation";

const MyAccountPage = () => {
  const { data: session } = useSession();
  const [pageId, setPageId] = useState<"ACCOUNT" | "SECURITY" | "SIGNATURE">(
    "ACCOUNT",
  );
  const params = useSearchParams();
  const section = params.get("secao");

  useEffect(() => {
    if (section === "assinatura") setPageId("SIGNATURE");
  }, []);

  const TabComponent = useMemo(() => {
    return {
      ACCOUNT: <Account session={session} />,
      SECURITY: <Security session={session} />,
      SIGNATURE: <Signature session={session} />,
    };
  }, [session]);

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
                  pageId === "ACCOUNT" ? "opacity-100" : "opacity-60",
                )}
                onClick={() => {
                  setPageId("ACCOUNT");
                }}
              >
                Conta
              </div>
              <div
                className={classNames(
                  "font-bold cursor-pointer text-black",
                  pageId === "SECURITY" ? "opacity-100" : "opacity-60",
                )}
                onClick={() => {
                  setPageId("SECURITY");
                }}
              >
                Segurança
              </div>
              <div
                className={classNames(
                  "font-bold cursor-pointer text-black",
                  pageId === "SIGNATURE" ? "opacity-100" : "opacity-60",
                )}
                onClick={() => {
                  setPageId("SIGNATURE");
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
        {TabComponent[pageId]}
      </div>
    </div>
  );
};

export default MyAccountPage;
