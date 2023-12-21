"use client";

import React, { useEffect } from "react";
import {
  CategoryCard,
  EmptyCoupons,
  FloatButtonNav,
  SearchCategory,
  SupplierCard,
} from "@/components";
import SupplierLogo from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import imageCategory from "@/images/easytolive/icons/categorie-example.svg";
import { ISuppliers } from "@/types/supplier";
import { ICategorieProps } from "@/components/atoms/CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import SkeletonSuppliersCards from "@/skeleton/SuppliersCards";
import SkeletonCategoriesCards from "@/skeleton/CategoriesCards";
import { useSupplierContext } from "@/providers/SuppliersProvider";
import EmptyIcon from "@/images/easytolive/icons/empty-icon.svg";

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
          label="meus cupons"
          hasCouponActive={true}
          backgroundStyle="secondary"
          icon={CouponPrimary}
          href="/meus-cupons"
        />
      )}
      <SearchCategory value={search || ""} onChange={handleSetSearch} />
      {categories && categories.length > 0 ? (
        <div className="flex overflow-x-auto justify-start my-4 w-full gap-2">
          {categories.map((category: ICategorieProps, index: number) => (
            <CategoryCard
              id={category.id}
              key={index}
              name={category.title}
              onClick={() => handleCategoryFilter(category.id)}
              image={imageCategory}
              isActive={category.id === supplierCategoriesFilter}
            />
          ))}
        </div>
      ) : (
        <SkeletonCategoriesCards numberofCategories={4} />
      )}
      {loadingSuppliers ? (
        <SkeletonSuppliersCards numberofSuppliers={10} />
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
            suppliers.map((supplier: ISuppliers, index: number) => {
              const { supplierInfo, _id: id, name } = supplier || {};

              const supplierCardData = {
                // avaliation: "4.6",
                id,
                name,
                couponsAvailableCount: supplierInfo?.validCoupons?.length || 0,
                saveLastPagePosition: handleRouteChange,
                supplierCategory: supplierInfo?.supplierCategory?.title,
                supplierImage: SupplierLogo,
              };

              return (
                <SupplierCard
                  key={supplier._id + index}
                  {...supplierCardData}
                />
              );
            })}
          {suppliers.length === 0 && (
            <EmptyCoupons
              icon={EmptyIcon}
              label="Não encontramos nenhum parceiro no momento :/"
            />
          )}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default PageHome;
