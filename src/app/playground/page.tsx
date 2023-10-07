"use client";

import { QRCodeReader } from "@/components";

import React from "react";

const PlaygroundPage = () => {
  const [qrCodeData, setQRCodeData] = React.useState<string>("");

  return (
    <div className="md:w-screen-xl md:max-w-screen-xl sm:mx-auto">
      {!qrCodeData && (
        <QRCodeReader
          onResultCallback={(result: any) => {
            setQRCodeData(result);
          }}
        />
      )}

      {!!qrCodeData && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">QR Code Data</h1>
          <p className="text-xl">{qrCodeData}</p>
        </div>
      )}
    </div>
  );
};

export default PlaygroundPage;
