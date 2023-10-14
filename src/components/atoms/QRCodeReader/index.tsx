import React from "react";
import { QrReader } from "react-qr-reader";
import QRCodeReaderMask from "../QRCodeReaderMask";

export interface IQRCodeReaderProps {
  onResultCallback: (result: any) => void;
  onErrorCallback?: (error: any) => void;
  onClose?: () => void;
  scanDelay?: number;
  textOverlay?: string;
  aditionalElements?: React.ReactNode;
}

const QRCodeReader: React.FC<IQRCodeReaderProps> = ({
  onResultCallback,
  onErrorCallback,
  onClose,
  scanDelay = 3000,
  textOverlay,
  aditionalElements,
}) => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  return (
    <QrReader
      scanDelay={scanDelay}
      onResult={(result, error) => {
        if (!!error && onErrorCallback) {
          return onErrorCallback(error);
        }

        if (!!result) {
          setIsSuccess(true);
          return onResultCallback(result);
        }
      }}
      videoContainerStyle={{
        height: "calc(100vh - 64px)",
        padding: "0px",
        backgroundColor: "#000",
      }}
      videoStyle={{
        height: "100%",
        objectFit: "cover",
      }}
      ViewFinder={() => {
        setTimeout(() => {
          setIsSuccess(false);
        }, 500);

        return (
          <QRCodeReaderMask
            onClose={onClose}
            success={isSuccess}
            textOverlay={textOverlay}
            aditionalElements={aditionalElements}
          />
        );
      }}
      constraints={{
        facingMode: "user",
        aspectRatio: 1,
      }}
    />
  );
};

export default QRCodeReader;
