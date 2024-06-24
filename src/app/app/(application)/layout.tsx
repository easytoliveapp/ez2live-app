"use client";

import React, { useEffect, useState } from "react";
import {
  TrialConversionModal,
  Header,
  HeaderLogged,
  CompleteSupplierRegister,
  Modal,
} from "@/components";
import date.isDateBeforeToday from "@/utils/date.isDateBeforeToday";
import { useSession } from "next-auth/react";
import useUserRoles from "@/hooks/useUserRoles";
import { useCompleteSupplierRegister } from "@/components/mols/CompleteSupplierRegister/Context";
import TrialEnded from "@/components/mols/TrialEnded";
import {
  localStorageHandler.getItemByLocalStorage,
  localStorageHandler.setItemToLocalStorage,
} from "@/utils/localStorageHelper";
import isTrialEndedUser from "@/utils/isTrialEndedUser";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const { isUpdate } = useCompleteSupplierRegister();
  const [showModal, setShowModal] = useState(false);
  const isCommomUser = useUserRoles().isCommonUser();
  const showTrialEndedCTA: boolean = localStorageHandler.getItemByLocalStorage("showTrialEndedCTA");

  useEffect(() => {
    session &&
      setShowModal(!date.isDateBeforeToday(session.user.subscriptionTrialEndDate));

    if (!showTrialEndedCTA) {
      setShowModal(true);
    }
  }, [session, showTrialEndedCTA]);

  const handleCloseModal = () => {
    setShowModal(false);
    return localStorageHandler.setItemToLocalStorage("showTrialEndedCTA", true);
  };

  const handleModal = () => {
    return setShowModal(!showModal);
  };

  return (
    <div>
      <head>
        <title>EasyToLive</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      {session?.user &&
        isCommomUser &&
        session.user.subscriptionTrialEndDate === null && (
          <Modal
            contentExtraClass="max-w-lg"
            closeOnBlur={false}
            hasCloseButton={false}
            show={showModal}
            onCloseModal={() => setShowModal(false)}
          >
            <TrialConversionModal
              handleModal={handleModal}
              userId={session.user.id}
            />
          </Modal>
        )}
      {isTrialEndedUser(session) && !showTrialEndedCTA && (
        <Modal
          onCloseModal={() => handleCloseModal()}
          closeOnBlur={true}
          show={showModal}
        >
          <TrialEnded setShowModal={setShowModal} />
        </Modal>
      )}
      {!!(
        isUpdate ||
        (session?.user &&
          !session.user.supplierInfo?.supplierBanner &&
          !session.user.supplierInfo?.supplierLogo &&
          !session.user.supplierInfo?.supplierDescription)
      ) && <CompleteSupplierRegister />}
      {session?.user ? <HeaderLogged /> : <Header />}
      <div className="app-layout__container">{children}</div>
    </div>
  );
};

export default AppLayout;
