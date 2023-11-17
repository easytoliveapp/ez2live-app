"use client";
import React, { FC, useEffect, useRef } from "react";
import NcModal from "@/components/atoms/NcModal/NcModal";

export interface ModalProps {
  contentExtraClass?: string;
  show: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
  closeOnBlur?: boolean;
  hasCloseButton?: boolean;
}

const Modal: FC<ModalProps> = ({
  show,
  onCloseModal,
  children,
  closeOnBlur,
  hasCloseButton = true,
  contentExtraClass = "max-w-lg",
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
    return <div className="max-h-[85vh] overflow-y-auto">{children}</div>;
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      hasCloseButton={hasCloseButton}
      closeOnBlur={closeOnBlur}
      isOpenProp={show}
      onCloseModal={onCloseModal}
      contentExtraClass={contentExtraClass}
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default Modal;
