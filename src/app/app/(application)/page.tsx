"use client";

import React, { useEffect, useState } from "react";
import { SearchCategory } from "@/components";
import Image from "next/image";
import couponsService from "@/service/coupons.service";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useSupplierContext } from "@/providers/SuppliersProvider";
import { ICouponCodesByUser } from "@/types/coupons";
import { showToastify } from "@/hooks/showToastify";
import useUserRoles from "@/hooks/useUserRoles";

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
  const { suppliers, search, handleSetSearch, setSupplierCategoriesFilter } =
    useSupplierContext();

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

  const BigCard = ({ title }) => {
    return (
      <div className="w-full col-span-2 rounded-2xl bg-green-700 flex flex-col items-center justify-center">
        {title}
      </div>
    );
  };
  const SmallCard = ({ title }) => {
    return (
      <div className="w-full rounded-2xl bg-green-700 flex flex-col items-center justify-center">
        {title}
      </div>
    );
  };

  return (
    <>
      {isMobile ? (
        <section className="w-full h-full bg-red-100">
          <div className="w-full h-[24rem] p-4 grid grid-cols-4 gap-4">
            <BigCard title="Restaurantes" />
            <BigCard title="Nutrição" />

            <SmallCard title="Estética" />
            <SmallCard title="Personal" />
            <SmallCard title="Suplementos" />
            <SmallCard title="Ver mais" />
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
