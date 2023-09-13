import React, { FC } from "react";
import ButtonPrimary from "@/components/atoms/Button/ButtonPrimary";
import ButtonSecondary from "@/components/atoms/Button/ButtonSecondary";
import NcModal from "@/components/atoms/NcModal/NcModal";

export interface ModalDeleteProps {
  show: boolean;
  onCloseModalDelete: () => void;
}

const ModalDelete: FC<ModalDeleteProps> = ({ show, onCloseModalDelete }) => {
  const handleClickSubmitForm = () => {
    console.log({ 1: "1" });
  };

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 ">
          Delete NFT
        </h3>
        <span className="text-sm">
          Are you sure you want to delete this NFT? You cannot undo this action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDelete}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDelete}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDelete;
