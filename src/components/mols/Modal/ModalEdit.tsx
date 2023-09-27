"use client";
import React, { FC, useEffect, useRef } from "react";
import NcModal from "@/components/atoms/NcModal/NcModal";

export interface ModalEditProps {
  show: boolean;
  onCloseModalEdit: () => void;
  children: React.ReactNode;
}

const ModalEdit: FC<ModalEditProps> = ({
  show,
  onCloseModalEdit,
  children,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          (element as HTMLTextAreaElement).setSelectionRange(
            (element as HTMLTextAreaElement).value.length,
            (element as HTMLTextAreaElement).value.length,
          );
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return <div>{children}</div>;
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalEdit}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalEdit;
