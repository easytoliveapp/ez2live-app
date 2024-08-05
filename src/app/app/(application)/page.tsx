"use client";

import React, { useEffect, useState } from "react";
import {
  CategoryCard,
  EmptyCoupons,
  FloatButtonNav,
  SearchCategory,
  SupplierCard,
} from "@/components";
import Image from "next/image";
import couponsService from "@/service/coupons.service";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import imageCategory from "@/images/easytolive/icons/categorie-example.svg";
import { ISupplier } from "@/types/supplier";
import { ICategorieProps } from "@/components/atoms/CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import SkeletonSuppliersCards from "@/skeleton/SuppliersCards";
import SkeletonCategoriesCards from "@/skeleton/CategoriesCards";
import { useSupplierContext } from "@/providers/SuppliersProvider";
import EmptyIcon from "@/images/easytolive/icons/empty-icon.svg";
import { ICouponCodesByUser } from "@/types/coupons";
import { showToastify } from "@/hooks/showToastify";
import useUserRoles from "@/hooks/useUserRoles";
import Easy2LiveLogo from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import { getRemainingUnitsAmount } from "@/utils/getCouponsRemaining";

function PageHome() {
  const { data: session } = useSession();
  const {
    categories,
    suppliers,
    loadingSuppliers,
    pageNumber,
    search,
    setPageNumber,
    hasMore,
    handleSetSearch,
    supplierCategoriesFilter,
    handleCategoryFilter,
    setSupplierCategoriesFilter,
  } = useSupplierContext();

  const searchParams = useSearchParams();
  const queryCategoryFilter = searchParams.get("supplierCategory");

  // set scroll restoration to manual
  const handleRouteChange = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
  };

  useEffect(() => {
    if (
      "scrollRestoration" in history &&
      history.scrollRestoration !== "manual"
    ) {
      history.scrollRestoration = "manual";
    }
  }, []);

  const getCouponsAvailableCountByCoupons = (coupons: any) => {
    if (!coupons) return 0;

    const couponsLength = coupons.filter(
      ({ remainingCouponsByUser, remainingCouponsTotal }: any) => {
        const currentRemaining = getRemainingUnitsAmount({
          remainingCouponsByUser,
          remainingCouponsTotal,
        });

        return currentRemaining === -1 || currentRemaining > 0;
      },
    ).length;

    return couponsLength;
  };
  //------------ get coupon codes by ser ------------------
  const isCommonUser = useUserRoles().isCommonUser();
  const [hasCouponActived, setHasCouponActived] = useState(false);
  const handleGetCouponCodesByUser = async () => {
    const res: any = await couponsService.getCouponCodesByUser();
    return res;
  };

  useEffect(() => {
    if (isCommonUser)
      handleGetCouponCodesByUser()
        .then((res) =>
          setHasCouponActived(
            res.data.coupons.some(
              (t: ICouponCodesByUser) => t.status === "ACTIVE",
            ),
          ),
        )
        .catch((error) =>
          showToastify({ type: "error", label: `Ocorreu um erro: ${error}` }),
        );
  }, [isCommonUser]);

  // ----------------------------------------------
  // restore scroll position
  useEffect(() => {
    if ("scrollPosition" in sessionStorage && suppliers.length > 0) {
      window.scrollTo(0, Number(sessionStorage.getItem("scrollPosition")));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [suppliers]);

  useEffect(() => {
    if (queryCategoryFilter) {
      setSupplierCategoriesFilter(queryCategoryFilter);
    }
  }, [queryCategoryFilter, setSupplierCategoriesFilter]);

  return (
    <section className="bg-[#EBEBEB] w-screen h-screen flex flex-col items-center">
      <main className=" w-full max-w-[60rem] h-[55%] pt-16">
        <nav className="flex items-center ">
          <Image src="/logoblack.svg" alt="logo black" width={65} height={40} />
          <ul className="flex justify-around w-full items-center">
            <li>Buscar desconto</li>
            <li>Restaurantes</li>
            <li>Suplementos</li>
            <li>Estética</li>
            <li>Nutrição</li>
            <li>Main</li>
            <button className="bg-main-purple py-4 px-8 rounded-xl text-white font-bold">
              Entrar
            </button>
          </ul>
        </nav>

        <div className="w-full h-full flex flex-col items-center justify-evenly pb-14">
          <h1 className="text-[#383839] font-bold text-[62px] leading-[4.5rem]">
            Sua vida saudável <br /> nunca foi tão{" "}
            <b className="text-main-purple">fácil</b>
          </h1>

          <SearchCategory value={search || ""} onChange={handleSetSearch} />
        </div>
      </main>

      <div className="bg-white w-full h-[45%] flex items-center justify-center overflow-hidden gap-6">
        <Image
          src="/procedimentos_est.png"
          alt="comidas fit"
          width="540"
          height="300"
          className="hover:scale-105 hover:-translate-y-2 transition-all ease-in-out duration-300 cursor-pointer"
        />
        <Image
          src="/comidas_fit.png"
          alt="comidas fit"
          width="540"
          height="300"
          className="hover:scale-105 hover:-translate-y-2 transition-all ease-in-out duration-300 cursor-pointer"
        />
        <Image
          src="/nut_e_treinadores.png"
          alt="comidas fit"
          width="540"
          height="300"
          className="hover:scale-105 hover:-translate-y-2 transition-all ease-in-out duration-300 cursor-pointer"
        />
      </div>
    </section>
  );
}

export default PageHome;
