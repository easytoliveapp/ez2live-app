import React from "react";
import ArrowRight from "@/images/easytolive/icons/arrow-next-right-gray-200.svg";
import Image from "next/image";

interface ISkeletonSupplierCard {
  numberofSuppliers: number;
}

const SkeletonSuppliersCards: React.FC<ISkeletonSupplierCard> = ({
  numberofSuppliers,
}) => {
  const SkeletonSupplierCard = () => {
    return (
      <div className="w-full my-2 h-auto rounded-lg p-3 grid grid-cols-5 gap-2 bg-generic-backgroundLigther cursor-pointer">
        <div className="col-span-1 flex items-center justify-center w-14 h-auto">
          <svg
            className="text-gray-200 rounded-full dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="col-span-3 max-sm:pl-5 h-auto w-auto grid-rows-3 gap-3">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-1.5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-3"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div>
        </div>
        <div className="col-span-1 relative">
          <div className="h-2.5 absolute right-0 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
          <button className="w-auto h-6 absolute right-0 bottom-2">
            <Image className="w-auto h-6" alt="Next Button" src={ArrowRight} />
          </button>
        </div>
      </div>
    );
  };
  const suppliers: any = [];
  for (let i = 0; i < numberofSuppliers; i++) {
    suppliers.push(<SkeletonSupplierCard key={i}></SkeletonSupplierCard>);
  }

  return <div className="my-4">{suppliers}</div>;
};

export default SkeletonSuppliersCards;
