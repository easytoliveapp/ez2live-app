"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Avaliation,
  ButtonSecondary,
  ButtonThird,
  LoadingComponent,
  CouponContainer,
  CreateAndUpdateCoupon,
  Modal,
  FloatButtonNav,
  EmptyCoupons,
} from "@/components";
import { ISupplier } from "@/types/supplier";
import ArrowLeft from "@/images/easytolive/icons/arrow-next-right-white.svg";
import supplierService from "@/service/supplier.service";
import { showToastify } from "@/hooks/showToastify";
import Arrow from "@/images/easytolive/icons/arrow-next-right-primary.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import Edit from "@/images/easytolive/icons/edit.svg";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import LogoMain from "@/images/easytolive/logo/logobranca-fundoprimary.svg";
import SupplierICon from "@/images/easytolive/icons/shop.svg";
import { useSession } from "next-auth/react";
import { ICoupon } from "@/types/coupons";
import CouponIcon from "@/images/easytolive/icons/couponPrimary.svg";
import CouponRed from "@/images/easytolive/icons/couponred.svg";
import useUserRoles from "@/hooks/useUserRoles";

interface ICouponListProps {
  supplierId: string;
}

const CouponList: React.FC<ICouponListProps> = ({ supplierId }) => {
  const [modalCreateCoupon, setModalCreateCoupon] = useState(false);
  const [supplier, setSupplier] = useState<ISupplier>();
  const [isOwnSupplier, setIsOwnSupplier] = useState(false);
  const { data: session } = useSession();

  const getSupplierById = async (id: string) => {
    const res: any = await supplierService.getSupplierById(id);
    return res;
  };

  useEffect(() => {
    if (supplier && session) {
      if (supplier.supplier.id === session.user.id) {
        setIsOwnSupplier(true);
      }
    }
  }, [session, supplier]);

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

  const filteredCoupons = (supplier?.coupons || [])
    .filter((coupon) => coupon.status === "ACTIVE")
    .filter(
      (coupon: ICoupon) =>
        coupon.maxTotal === -1 || coupon.couponCodesGenerated < coupon.maxTotal,
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

  const CommomUserNavigation = useUserRoles().isSupplier() ? (
    ""
  ) : (
    <FloatButtonNav
      label="buscar cupons"
      backgroundStyle="main"
      icon={SupplierICon}
      href={"/"}
    />
  );

  return supplier ? (
    <div className="relative h-full w-full mx-auto">
      {isOwnSupplier && (
        <FloatButtonNav
          hasCouponActive={false}
          backgroundStyle="secondary"
          icon={CouponIcon}
          href="/dashboard"
        />
      )}
      {CommomUserNavigation}
      <Modal
        closeOnBlur={false}
        show={modalCreateCoupon}
        onCloseModal={() => setModalCreateCoupon(false)}
      >
        <div className="flex flex-col items-center w-full">
          <CreateAndUpdateCoupon
            setCouponModal={setModalCreateCoupon}
            handleCouponUpdate={handleCouponUpdate}
          />
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
        prefetch={true}
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
        <div className="md:w-[700px] mx-auto">
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
              <Avaliation rating={"4.7"} />
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
            vero velit quam repellendus facere ea recusandae, sapiente
            repudiandae perspiciatis temporibus et exercitatione illum nobis
            corrupti, sunt voluptates perferendis dicta fugiat.
          </p>
          <div className="mt-6 pb-16 flex flex-col gap-4">
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon, key) => (
                <CouponContainer
                  supplierId={supplier.supplier.id}
                  isOwnSupplier={isOwnSupplier}
                  couponTitle={coupon.title}
                  icon={isOwnSupplier ? Edit : Arrow}
                  couponId={coupon.id}
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
              <EmptyCoupons
                couponColor={CouponRed}
                title="Nenhum cupom disponível"
                href={session?.user.isSupplier ? "" : "/"}
                label={session?.user.isSupplier ? "" : "ver outros parceiros"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingComponent Icon={LogoMain} />
  );
};

export default CouponList;
