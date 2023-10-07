import React from "react";
import { QrReader } from "react-qr-reader";
import QRCodeReaderMask from "../QRCodeReaderMask";

export interface IQRCodeReaderProps {
  onResultCallback: (result: string) => void;
  onErrorCallback?: (error: string) => void;
}

const QRCodeReader: React.FC<any> = ({ onResultCallback, onErrorCallback }) => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  return (
    <QrReader
      scanDelay={3000}
      onResult={(result, error) => {
        if (!!error && onErrorCallback) {
          return onErrorCallback(error);
        }

        if (!!result) {
          console.log("result");
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
            onClose={() => console.log("Lorem ipsum")}
            success={isSuccess}
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
