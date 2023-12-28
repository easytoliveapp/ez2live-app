"use client";

import React, { useEffect, useState } from "react";
import {
  PremiumConversionModal,
  Header,
  HeaderLogged,
  CompleteSupplierRegister,
} from "@/components";
import isDateValid from "@/utils/isDateValid";
import { useSession } from "next-auth/react";
import useUserRoles from "@/hooks/useUserRoles";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [isPremiumExpired, setIsPremiumExpired] = useState(false);

  const isCommomUser = useUserRoles().isCommonUser();

  useEffect(() => {
    if (session) {
      setIsPremiumExpired(!isDateValid(session.user.subscriptionEndDate));
    }
  }, [session]);

  return (
    <div>
      {session?.user && isPremiumExpired && isCommomUser && (
        <PremiumConversionModal
          isPremiumExpired={isPremiumExpired}
          isNewUser={session.user.subscriptionEndDate === null}
          setIsPremiumExpired={setIsPremiumExpired}
          userId={session.user.id}
        />
      )}
      {session?.user &&
        !session.user.supplierInfo?.supplierBanner &&
        !session.user.supplierInfo?.supplierLogo &&
        !session.user.supplierInfo?.supplierDescription && (
          <CompleteSupplierRegister />
        )}
      {session?.user ? <HeaderLogged /> : <Header />}
      <div className="app-layout__container">{children}</div>
    </div>
  );
};

export default AppLayout;
