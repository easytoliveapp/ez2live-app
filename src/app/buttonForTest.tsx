"use client";

import React from "react";
import supplierService from "@/service/supplier.service";

const ButtonForTest = () => {
  const handleClick = async () => {
    const result = await supplierService.getSupplierList({
      name: "Account test",
    });
    return console.log(result);
  };

  return <button onClick={handleClick}> TESTE AQUI</button>;
};

export default ButtonForTest