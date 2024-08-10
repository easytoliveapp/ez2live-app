"use client";

import React, { useState, useMemo, useEffect } from "react";
import classNames from "@/utils/classNames";
import { useSession } from "next-auth/react";
import { SecurityTab } from "./security";
import { AccountTab } from "./account";
import { SubscriptionTab } from "./subscription";
import {
  IGetPaymentMethodResponse,
  IGetSubscriptionResponse,
} from "@/types/subscription/response/index";
import subscriptionService from "@/service/subscription.service";
import { showToastify } from "@/hooks/showToastify";
import { useSearchParams } from "next/navigation";
import useUserRoles from "@/hooks/useUserRoles";
import userService from "@/service/users.service";

const MyAccountPage = () => {
  const { data: session, update } = useSession();
  const [pageId, setPageId] = useState<"ACCOUNT" | "SECURITY" | "SUBSCRIPTION">(
    "ACCOUNT",
  );
  const params = useSearchParams();
  const section = params.get("aba");
  const [subscriptionInfo, setSubscriptionInfo] =
    useState<IGetSubscriptionResponse>();
  const [paymentMethodInfo, setPaymentMethodInfo] =
    useState<IGetPaymentMethodResponse>();

  const hasIuguCostumerId = session?.user.iuguCustomerId;

  const getUserInfoAndUpdate = async () => {
    if (session)
      await userService
        .getUserFull(session.user.id)
        .then((res: any) => {
          update({
            ...session,
            user: res.data.user,
          });
          setSubscriptionInfo(res.data.subscription);
        })
        .catch(() => {
          showToastify({
            label: "Ocorreu um erro ao carregar dados da assinatura",
            type: "error",
          });
        });
  };

  const getPaymentMethodInfo = async () => {
    await subscriptionService.getPaymentMethod().then((res: any) => {
      setPaymentMethodInfo(res.data);
    });
  };

  const hasPaymentMethod = () => {
    return session?.user.iuguPaymentMethodId;
  };

  const handlePaymentMethodInfo = (
    paymentMethod: IGetPaymentMethodResponse,
  ) => {
    setPaymentMethodInfo(paymentMethod);
  };

  useEffect(() => {
    if (section === "assinatura") setPageId("SUBSCRIPTION");
    getUserInfoAndUpdate();
    !paymentMethodInfo && hasPaymentMethod() && getPaymentMethodInfo();
  }, []);

  useEffect(() => {
    if (hasIuguCostumerId && !subscriptionInfo) {
    }
  }, [subscriptionInfo]);

  const TabComponent = useMemo(() => {
    return {
      ACCOUNT: <AccountTab session={session} />,
      SECURITY: <SecurityTab session={session} />,
      SUBSCRIPTION: (
        <SubscriptionTab
          session={session}
          subscriptionInfo={subscriptionInfo}
          paymentMethodInfo={paymentMethodInfo}
          handlePaymentMethodInfo={handlePaymentMethodInfo}
        />
      ),
    };
  }, [session, subscriptionInfo, paymentMethodInfo]);

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="my-8 flex items-center justify-between max-w-lg m-auto px-2">
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
        <div className="max-w-lg mx-auto">
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
              {useUserRoles().isCommonUser() && (
                <div
                  className={classNames(
                    "font-bold cursor-pointer text-black",
                    pageId === "SUBSCRIPTION" ? "opacity-100" : "opacity-60",
                  )}
                  onClick={() => {
                    setPageId("SUBSCRIPTION");
                  }}
                >
                  Assinatura
                </div>
              )}
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
