import React from "react";
import cx from "classnames";
import XMark from "@heroicons/react/24/outline/XMarkIcon";

export interface IQRCodeReaderMaskProps {
  onClose?: () => void;
  success?: boolean;
  aditionalElements?: React.ReactNode;
  textOverlay?: string;
}

const QRCodeReaderMask: React.FC<IQRCodeReaderMaskProps> = ({
  onClose,
  success,
  textOverlay,
  aditionalElements,
}) => {
  return (
    <>
      <div className="flex z-10 relative my-auto p-5 h-[100%] flex-col items-center justify-center text-center text-white">
        {onClose && (
          <div className="absolute top-5 right-5 z-50">
            <button onClick={onClose}>
              <XMark className="w-8 h-8" />
            </button>
          </div>
        )}
        <div className="max-w-[350px] max-h-[350px] mb-36 h-full w-full">
          {textOverlay && (
            <div className="p-5 z-50 font-thin">
              <p>{textOverlay}</p>
            </div>
          )}
          <div
            className={cx(
              "w-full h-full max-w-[350px] bg-transparent border-2 rounded-md",
              {
                "border-green-500": success,
                "border-transparent": !success,
              },
            )}
            style={{
              boxShadow: "0 0 0 50000px rgba(0,0,0,0.7)",
            }}
          />
        </div>
        {aditionalElements && aditionalElements}
      </div>
    </>
  );
};

export default QRCodeReaderMask;
