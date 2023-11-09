"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Avaliation,
  ButtonSecondary,
  ButtonThird,
  LoadingComponent,
} from "@/components/atoms";
import { CouponContainer } from "@/components/orgs";
import { ISupplier } from "@/types/supplier";
import ArrowLeft from "@/images/easytolive/icons/arrow-next-right-white.svg";
import supplierService from "@/service/supplier.service";
import { showToastify } from "@/hooks/showToastify";
import Arrow from "@/images/easytolive/icons/arrow-next-right-primary.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import Edit from "@/images/easytolive/icons/edit.svg";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import { useSession } from "next-auth/react";
import { CreateAndUpdateCoupon, Modal } from "@/components/mols";
import { ICoupon } from "@/types/coupons";

interface ICouponListProps {
  supplierId: string;
}

const CouponList: React.FC<ICouponListProps> = ({ supplierId }) => {
  const [modalCreateCoupon, setModalCreateCoupon] = useState(false);
  const [supplier, setSupplier] = useState<ISupplier>();
  const { data: session } = useSession();

  const getSupplierById = async (id: string) => {
    const res: any = await supplierService.getSupplierById(id);
    return res;
  };

  useEffect(() => {
    getSupplierById(supplierId)
      .then((res) => {
        setSupplier(res?.data);
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
  }, [supplierId]);

  const activeCoupons = supplier?.coupons?.filter(
    (coupon) => coupon.status === "ACTIVE",
  );

  const handleCouponUpdate = (
    updatedCoupon: ICoupon,
    action: "CREATE" | "UPDATE" | "DELETE",
  ) => {
    if (action === "CREATE") {
      setSupplier({
        ...(supplier as ISupplier),
        coupons: [...(supplier?.coupons || []), updatedCoupon],
      });
      return;
    }

    if (action === "DELETE") {
      const updatedCoupons = supplier?.coupons?.filter(
        (coupon) => coupon.id !== updatedCoupon.id,
      );

      if (updatedCoupons) {
        setSupplier({
          ...(supplier as ISupplier),
          coupons: updatedCoupons,
        });
      }
      return;
    }

    if (action === "UPDATE") {
      const updatedCoupons = supplier?.coupons?.map((coupon) => {
        if (coupon.id === updatedCoupon.id) {
          return updatedCoupon;
        }
        return coupon;
      });

      if (updatedCoupons) {
        setSupplier({
          ...(supplier as ISupplier),
          coupons: updatedCoupons,
        });
      }
      return;
    }
  };

  return supplier ? (
    <div className="relative min-h-[800px] md:w-[500px] h-full w-full mx-auto">
      <Modal
        closeOnBlur={false}
        show={modalCreateCoupon}
        onCloseModal={() => setModalCreateCoupon(false)}
      >
        <div className="flex flex-col items-center w-full">
          <CreateAndUpdateCoupon handleCouponUpdate={handleCouponUpdate} />
          <ButtonThird
            className="text-generic-alertRed"
            onClick={() => setModalCreateCoupon(false)}
          >
            cancelar
          </ButtonThird>
        </div>
      </Modal>
      <div className="h-40 w-full bg-gradient-to-r from-primary-lighter to-primary-main"></div>
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
      <div className="px-5 py-6 -mt-6 rounded-t-3xl bg-generic-background w-full h-full">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Link
              href={`/?supplierCategory=${supplier.supplier.supplierInfo.supplierCategory.id}`}
              className="text-xs underline font-bold text-generic-dark"
            >
              {supplier?.supplier?.supplierInfo?.supplierCategory?.title}
            </Link>
            <p className="text-xs font-bold text-generic-dark">
              / {supplier?.supplier?.name}
            </p>
          </div>
          <div className="flex flex-col">
            <Avaliation note={"4.7"} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Image
            className="w-12 my-4 h-auto rounded-full"
            alt="Logo Image"
            src={LogoImage}
          />
          <div>
            {supplier?.supplier?.id === session?.user?.id && (
              <ButtonSecondary onClick={() => setModalCreateCoupon(true)}>
                <Image
                  src={CouponPrimary}
                  className="w-6 mr-3 h-auto"
                  alt="coupon-image"
                />
                Novo Cupom
              </ButtonSecondary>
            )}
          </div>
        </div>
        <h2 className=" text-xl font-semibold">{supplier?.supplier?.name}</h2>
        <p className="pt-2 text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          vero velit quam repellendus facere ea recusandae, sapiente repudiandae
          perspiciatis temporibus et exercitatione illum nobis corrupti, sunt
          voluptates perferendis dicta fugiat.
        </p>
        <div className="mt-6 pb-16 flex flex-col gap-4">
          {activeCoupons && activeCoupons.length > 0 ? (
            activeCoupons.map((coupon, key) => (
              <CouponContainer
                isOwnSupplier={supplier.supplier.id === session?.user.id}
                couponTitle={coupon.title}
                icon={supplier.supplier.id === session?.user.id ? Edit : Arrow}
                CouponId={coupon.id}
                supplierCategory={
                  supplier?.supplier?.supplierInfo?.supplierCategory?.title
                }
                supplierLogo={LogoImage}
                supplierName={supplier.supplier.name}
                discount={coupon.discount}
                expirateTime={coupon.expirationGenerationDate}
                expirationUseDate={coupon.expirationUseDate}
                maxUnitsTotal={coupon.maxTotal}
                key={key}
                handleCouponUpdate={handleCouponUpdate}
              />
            ))
          ) : (
            <em className="text-xs">Nenhum cupom ativo foi encontrado...</em>
          )}
        </div>
      </div>
      <span className="md:w-[500px] absolute bottom-0 text-neutral-400 w-full flex justify-center items-center h-16 bg-generic-dark">
        Todos os direitos reservados
      </span>
    </div>
  ) : (
    <LoadingComponent />
  );
};

export default CouponList;
