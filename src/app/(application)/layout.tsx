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

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [isPremiumExpired, setIsPremiumExpired] = useState(false);

  useEffect(() => {
    if (session) {
      setIsPremiumExpired(!isDateValid(session.user.subscriptionEndDate));
    }
  }, [session]);

  return (
    <div>
      {session?.user && isPremiumExpired && (
        <PremiumConversionModal
          isPremiumExpired={isPremiumExpired}
          isNewUser={session.user.subscriptionEndDate === null}
          setIsPremiumExpired={setIsPremiumExpired}
          userId={session.user.id}
        />
      )}

      {/* {true && <CompleteSupplierRegister />} */}

      {session?.user ? <HeaderLogged /> : <Header />}
      <div className="app-layout__container">{children}</div>
    </div>
  );
};

export default AppLayout;
