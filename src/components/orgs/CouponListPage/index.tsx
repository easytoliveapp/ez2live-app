"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Avaliation, SupplierCoupons } from "@/components/atoms";
import { ISupplier } from "@/types/supplier";
import ArrowLeft from "@/images/easytolive/icons/arrow-next-right-white.svg";
import supplierService from "@/service/supplier.service";
import { showToastify } from "@/hooks/showToastify";

import Arrow from "@/images/easytolive/icons/arrow-next-right-primary.svg";
import Edit from "@/images/easytolive/icons/edit.svg";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import { useSession } from "next-auth/react";

interface ICouponListPageProps {
  supplierId: string;
}

const CouponListPage: React.FC<ICouponListPageProps> = ({ supplierId }) => {
  const [supplier, setSupplier] = useState<ISupplier>();
  const { data: session } = useSession();
  const user = session?.user;

  const getSupplierById = async (id: string) => {
    const res: any = await supplierService.getSupplierById(id);
    return res;
  };

  useEffect(() => {
    getSupplierById(supplierId)
      .then((res) => {
        setSupplier(res?.data?.supplier);
      })
      .catch((error) => {
        if (error?.response?.data?.code === 400) {
          showToastify({
            label:
              "Oops! Parece que você acessou um endereço de estabelecimento errado",
            type: "error",
          });
        }
      });
  }, []);

  return (
    <div className="relative md:w-[500px] h-full w-full mx-auto">
      <div className="h-40 w-full bg-gradient-to-r from-primary-ez2lliveBlue to-primary-ez2live"></div>
      <Link
        className="absolute flex items-center justify-center rounded-full top-4 left-4 cursor-pointer h-8 w-8 bg-neutral-400 opacity-75 rotate-180"
        href={"/"}
      >
        <Image className="w-6 h-auto" alt="arrow-left" src={ArrowLeft} />
      </Link>
      <Image
        className="absolute rounded-full w-20 h-auto top-8 right-4"
        src={LogoImage}
        alt="Logo-restaurante"
      />
      <div className="px-5 py-6 -mt-6 rounded-t-3xl bg-primary-ez2livebg w-full h-full">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Link href={`/`} className="text-xs underline">
              {supplier?.supplierCategory.title}
            </Link>
            <p className="text-xs">/ {supplier?.name}</p>
          </div>
          <Avaliation note={"4.7"} />
        </div>
        <Image
          className="w-12 my-4 h-auto rounded-full"
          alt="Logo Image"
          src={LogoImage}
        />

        <h2 className=" text-xl font-semibold">{supplier?.name}</h2>
        <p className="pt-2 text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          vero velit quam repellendus facere ea recusandae, sapiente repudiandae
          perspiciatis temporibus et exercitatione illum nobis corrupti, sunt
          voluptates perferendis dicta fugiat.
        </p>
        <div className="mt-6 pb-16 flex flex-col gap-4">
          {supplier &&
          Array.isArray(supplier?.coupons) &&
          supplier.coupons.length > 0 ? (
            supplier?.coupons.map((coupon, key) => (
              <SupplierCoupons
                icon={supplier.id == user?.id ? Edit : Arrow}
                discount={coupon.discount}
                expirateTime={5}
                unintsAmount={20}
                key={key}
              />
            ))
          ) : (
            <em className="text-xs">Nenhum cupom foi criado ainda...</em>
          )}
        </div>
      </div>
      <span className="md:w-[500px] fixed bottom-0 text-neutral-400 w-full flex justify-center items-center h-16 bg-alternative-darker">
        Todos os direitos reservados
      </span>
    </div>
  );
};

export default CouponListPage;
