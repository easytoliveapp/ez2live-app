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
  EmptyCoupons,
  FloatButtonNav,
} from "@/components";
import { ISupplierResponse } from "@/types/supplier";
import ArrowLeft from "@/images/easytolive/icons/arrow-next-right-white.svg";
import supplierService from "@/service/supplier.service";
import { showToastify } from "@/hooks/showToastify";
import Arrow from "@/images/easytolive/icons/arrow-next-right-primary.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import Edit from "@/images/easytolive/icons/edit.svg";
import LogoMain from "@/images/easytolive/logo/logobranca-fundoprimary.svg";
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
  const [supplierResponse, setSupplierResponse] = useState<ISupplierResponse>();
  const [isOwnSupplier, setIsOwnSupplier] = useState(false);
  const { data: session } = useSession();
  const supplier = supplierResponse?.supplier;
  const coupons = supplierResponse?.coupons;

  const getSupplierById = async (id: string) => {
    const res: any = await supplierService.getSupplierById(id);
    return res;
  };

  useEffect(() => {
    if (supplier && session) {
      if (supplier._id === session.user.id) {
        setIsOwnSupplier(true);
      }
    }
  }, [session, supplier]);

  useEffect(() => {
    getSupplierById(supplierId)
      .then((res) => {
        setSupplierResponse(res?.data);
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

  const filteredCoupons = (coupons || [])
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
      setSupplierResponse({
        ...(supplierResponse as ISupplierResponse),
        coupons: [...(coupons || []), updatedCoupon],
      });
      return;
    }

    if (action === "DELETE") {
      const updatedCoupons = coupons?.filter(
        (coupon) => coupon.id !== updatedCoupon.id,
      );

      if (updatedCoupons) {
        setSupplierResponse({
          ...(supplierResponse as ISupplierResponse),
          coupons: updatedCoupons,
        });
      }
      return;
    }

    if (action === "UPDATE") {
      const updatedCoupons = coupons?.map((coupon) => {
        if (coupon.id === updatedCoupon.id) {
          return updatedCoupon;
        }
        return coupon;
      });

      if (updatedCoupons) {
        setSupplierResponse({
          ...(supplierResponse as ISupplierResponse),
          coupons: updatedCoupons,
        });
      }
      return;
    }
  };

  const isSupplier = useUserRoles().isSupplier();

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
      <div className="h-auto pb-6 relative max-h-80 w-full mx-auto flex justify-center bg-cover bg-gradient-to-r from-primary-lighter to-primary-main">
        {supplier.supplierInfo.supplierBanner && (
          <Image
            objectPosition="center"
            loading="lazy"
            alt="supplier-banner"
            objectFit="cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "auto", minHeight: "140px" }}
            src={supplier.supplierInfo.supplierBanner}
          />
        )}
      </div>
      <Link
        prefetch={true}
        className="absolute flex items-center justify-center rounded-full top-4 left-4 cursor-pointer h-8 w-8 bg-neutral-400 opacity-75 rotate-180"
        href={"/"}
      >
        <Image className="w-6 h-auto" alt="arrow-left" src={ArrowLeft} />
      </Link>
      {supplier.supplierInfo.supplierLogo && (
        <Image
          className="absolute rounded-full top-8 right-4"
          width={0}
          height={0}
          sizes="100vw"
          style={{ maxWidth: "80px", height: "auto", width: "auto" }}
          src={supplier.supplierInfo.supplierLogo}
          alt="Logo-restaurante"
        />
      )}

      <div className="relative px-5 py-6 -mt-6 rounded-t-3xl bg-generic-background w-full h-full">
        <div className="md:w-[700px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Link
                href={`/?supplierCategory=${supplier.supplierInfo.supplierCategory.id}`}
                className="text-xs underline font-bold text-generic-dark"
              >
                {supplier?.supplierInfo?.supplierCategory?.title}
              </Link>
              <p className="text-xs font-bold text-generic-dark">
                / {supplier?.name}
              </p>
            </div>
            <div className="flex flex-col">
              <Avaliation rating={"4.7"} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            {supplier.supplierInfo.supplierLogo && (
              <Image
                className="w-16 my-4 h-auto rounded-full mr-4"
                alt="Logo Image"
                height={64}
                width={64}
                src={supplier.supplierInfo.supplierLogo}
              />
            )}

            <div>
              {supplier?._id === session?.user?.id && (
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
          <h2 className=" text-xl font-semibold">{supplier?.name}</h2>
          {supplier.supplierInfo.supplierDescription && (
            <p className="pt-2 text-xs text-gray-400">
              {supplier.supplierInfo.supplierDescription}
            </p>
          )}
          <div className="mt-6 pb-16 flex flex-col gap-4">
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon, key) => (
                <CouponContainer
                  supplierId={supplier._id}
                  isOwnSupplier={isOwnSupplier}
                  couponTitle={coupon.title}
                  icon={isOwnSupplier ? Edit : Arrow}
                  couponId={coupon.id}
                  supplierCategory={
                    supplier?.supplierInfo?.supplierCategory?.title
                  }
                  supplierLogo={supplier.supplierInfo.supplierLogo ?? ""}
                  supplierName={supplier.name}
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
                icon={CouponRed}
                title="Nenhum cupom disponível"
                href={!isSupplier && "/"}
                label={!isSupplier && "ver outros parceiros"}
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
