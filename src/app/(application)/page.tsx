"use client";

import React, { useEffect } from "react";
import { SupplierCard } from "@/components/mols";
import {
  CategoryCard,
  FloatButtonNav,
  SearchCategory,
} from "@/components/atoms";
import SupplierLogo from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import imageCategory from "@/images/easytolive/icons/categorie-example.svg";
import { ISuppliers } from "@/types/supplier";
import { ICategorieProps } from "@/components/atoms/CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useSupplierContext } from "@/providers/SuppliersProvider";

function PageHome() {
  const { data: session } = useSession();
  const {
    categories,
    suppliers,
    loadingSuppliers,
    pageNumber,
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
  }, [queryCategoryFilter]);

  return (
    <div className="md:w-[600px] w-full m-auto px-5 relative">
      {session?.user && (
        <FloatButtonNav
          hasCouponActive={true}
          backgroundStyle="secondary"
          icon={CouponPrimary}
          href="/my-coupons"
        />
      )}
      <SearchCategory onChange={handleSetSearch} />
      {categories && categories.length > 0 && (
        <div className="flex overflow-x-auto justify-start my-4 w-full gap-2">
          {categories.map((category: ICategorieProps, index: number) => (
            <CategoryCard
              key={index}
              name={category.title}
              onClick={() => handleCategoryFilter(category.id)}
              image={imageCategory}
              isActive={category.id === supplierCategoriesFilter}
            />
          ))}
        </div>
      )}
      {loadingSuppliers ? (
        <em>Carregando...</em>
      ) : (
        <InfiniteScroll
          className="flex flex-col gap-3"
          dataLength={suppliers.length}
          next={() => setPageNumber(pageNumber + 1)}
          hasMore={hasMore}
          loader={<h4 className=" m-4 text-primary-main">Carregando...</h4>}
          endMessage={<p className="m-4 text-primary-main text-center">...</p>}
        >
          {!!suppliers &&
            suppliers.length > 0 &&
            suppliers.map((supplier: ISuppliers, index: number) => (
              <SupplierCard
                supplierCategory={
                  supplier?.supplierInfo?.supplierCategory?.title
                }
                supplierImage={SupplierLogo}
                avaliation="4.6"
                couponsAvaible={
                  supplier.supplierInfo.coupons.filter(
                    (t) => t.status === "ACTIVE",
                  ).length
                }
                name={supplier.name}
                key={supplier._id + index}
                id={supplier._id}
                saveLastPagePosition={handleRouteChange}
              />
            ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default PageHome;
