"use client";

import React from "react";
import supplierService from "@/service/supplier.service";

const ButtonForTest = () => {
  const handleClick = async () => {
    const result = await supplierService.verifySupplier({
      Id: "64a44df587d4fqweqwe15b58d9df5b",
    });
    return console.log(result);
  };

  return <button onClick={handleClick}> TESTE AQUI</button>;
};

export default ButtonForTest;
