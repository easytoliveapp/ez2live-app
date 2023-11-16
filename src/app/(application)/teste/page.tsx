import React from "react";
import SkeletonSuppliersCards from "@/skeleton/SuppliersCards";

export default function TestePage() {
  return (
    <div className="my-4">
      <SkeletonSuppliersCards numberofSuppliers={5} />
    </div>
  );
}
