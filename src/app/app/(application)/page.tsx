"use client";

import React, { useEffect, useState } from "react";
import {
  CategoryCard,
  EmptyCoupons,
  FloatButtonNav,
  SearchCategory,
  SupplierCard,
} from "@/components";
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
import Image from "next/image";

function PageHome() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Check for mobile screen width
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on window resize

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleRouteChange = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
  };

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

  interface ICardProps {
    title: string;
    imgSrc: string;
  }

  const BigCard = ({ title, imgSrc }: ICardProps) => {
    return (
      <div className="bg-[#f1f1f1] overflow-hidden w-full rounded-xl p-4 w-full relative flex flex-col justify-between">
        <h2 className="text-lg  text-gray-800">{title}</h2>
        <div
          className="absolute -bottom-3 right-0 w-[45%] h-full bg-contain bg-no-repeat bg-right-bottom"
          style={{
            backgroundImage: `url('/${imgSrc}')`,
          }}
        />
      </div>
    );
  };
  const SmallCard = ({ title, imgSrc }: ICardProps) => {
    return (
      <div className="w-full rounded-2xl bg-[#f1f1f1] flex h-full max-h-[110px] flex-col items-center justify-center p-4 box-border">
        <Image
          width={100}
          height={100}
          className=""
          alt={`${title}`}
          src={`/${imgSrc}`}
        />
        <h2
          className={` ${
            title === "Suplementos" ? "text-sm" : "text-lg"
          } text-gray-800`}
        >
          {title}
        </h2>
      </div>
    );
  };

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

  return (
    <>
      {isMobile ? (
        <section className="w-full h-screen bg-white">
          <div className="w-full h-[25rem] p-4  flex-col gap-4 bg-red-100">
            <div className="grid grid-cols-2 w-full h-28">
              <BigCard title="Restaurantes" imgSrc="laranjas.png" />
              <BigCard title="Nutrição" imgSrc="salada.png" />
            </div>

            <div className="grid grid-cols-4 w-full h-28">
              <SmallCard title="Estética" imgSrc="salada.png" />
              <SmallCard title="Personal" imgSrc="salada.png" />
              <SmallCard title="Suplementos" imgSrc="salada.png" />
              <SmallCard title="Ver mais" imgSrc="salada.png" />
            </div>
          </div>

          <div className="bg-red-400 w-full h-[4rem]"></div>

          <div className="w-full px-4">
            <p className="font-bold">Nossos parceiros</p>
            <p className="text-[#A6a6a6]">
              As melhores franquias confiam na Easy!
            </p>
          </div>

          <InfiniteScroll
            dataLength={suppliers.length}
            next={() => setPageNumber(pageNumber + 1)}
            hasMore={hasMore}
            loader={<h4 className="m-4 text-primary-main">Carregando...</h4>}
            endMessage={
              <p className="m-4 text-primary-main text-center">...</p>
            }
            scrollableTarget="scrollableDiv"
            scrollThreshold="200px"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {!!suppliers &&
              suppliers.length > 0 &&
              suppliers.map((supplier: ISupplier, index: number) => {
                const { supplierInfo, _id: id, name } = supplier || {};

                const supplierCardData = {
                  // avaliation: "4.6",
                  id,
                  name,
                  couponsAvailableCount: getCouponsAvailableCountByCoupons(
                    supplier.supplierInfo?.coupons,
                  ),
                  saveLastPagePosition: handleRouteChange,
                  supplierCategory: supplierInfo?.supplierCategory?.title,
                  supplierImage: supplierInfo.supplierLogo ?? Easy2LiveLogo,
                };

                return (
                  <div key={supplier._id + index} className="flex-shrink-0 p-4">
                    <SupplierCard
                      minimalSupplierCard
                      key={supplier._id + index}
                      {...supplierCardData}
                    />
                  </div>
                );
              })}
            {suppliers.length === 0 && (
              <EmptyCoupons
                titleStyle="text-generic-grayLighter"
                icon={EmptyIcon}
                title="Não encontramos nenhum parceiro no momento :/"
              />
            )}
          </InfiniteScroll>

          <div className="w-full flex items-center justify-center overflow-hidden gap-4">
            <Image
              src="/procedimentos_est.png"
              alt="comidas fit"
              width="200"
              objectFit="cover"
              height="90"
            />
            <Image
              src="/comidas_fit.png"
              alt="comidas fit"
              width="200"
              objectFit="cover"
              height="90"
            />
            <Image
              src="/nut_e_treinadores.png"
              alt="comidas fit"
              width="200"
              objectFit="cover"
              height="90"
            />
          </div>
        </section>
      ) : (
        <section className="bg-[#EBEBEB] w-screen h-screen flex flex-col items-center">
          <div
            className="relative w-full h-[55%] flex items-center justify-center"
            id="wrapper"
          >
            <Image
              src="/pratos.png"
              alt="comidas fit"
              width="600"
              objectFit="cover"
              height="600"
              className="absolute z-10 h-full -left-72"
            />
            <Image
              src="/dumbells.png"
              alt="comidas fit"
              width="627"
              objectFit="cover"
              height="607"
              className="absolute scale-125 z-10 h-full -right-80"
            />
            <main className="w-full h-full max-w-[60rem] pt-16 z-50">
              <nav className="flex items-center ">
                <Image
                  src="/logoblack.svg"
                  alt="logo black"
                  width={65}
                  height={40}
                />
                <ul className="flex justify-around w-full items-center">
                  <li>Buscar desconto</li>
                  <li>Restaurantes</li>
                  <li>Suplementos</li>
                  <li>Estética</li>
                  <li>Nutrição</li>
                  <li>Mais</li>
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

                <SearchCategory
                  value={search || ""}
                  onChange={handleSetSearch}
                />
              </div>
            </main>
          </div>

          <div className="bg-white w-full h-[45%] flex items-center justify-center overflow-hidden gap-6">
            <Image
              src="/procedimentos_est.png"
              alt="comidas fit"
              width="540"
              objectFit="cover"
              height="300"
              className="hover:scale-105 hover:-translate-y-2 transition-all ease-in-out duration-300 cursor-pointer"
            />
            <Image
              src="/comidas_fit.png"
              alt="comidas fit"
              width="540"
              objectFit="cover"
              height="300"
              className="hover:scale-105 hover:-translate-y-2 transition-all ease-in-out duration-300 cursor-pointer"
            />
            <Image
              src="/nut_e_treinadores.png"
              alt="comidas fit"
              width="540"
              objectFit="cover"
              height="300"
              className="hover:scale-105 hover:-translate-y-2 transition-all ease-in-out duration-300 cursor-pointer"
            />
          </div>
        </section>
      )}
    </>
  );
}

export default PageHome;
