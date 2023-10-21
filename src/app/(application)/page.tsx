"use client";

import React, { useEffect, useState } from "react";
import { SupplierCard } from "@/components/mols";
import {
  CategoryCard,
  FloatButtonNav,
  SearchCategory,
} from "@/components/atoms";
import SupplierLogo from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import SupplierService from "@/service/supplier.service";
import imageCategory from "@/images/easytolive/icons/categorie-example.svg";
import { ISuppliers, ISupplierList } from "@/types/supplier";
import { useDebounce } from "use-debounce";
import { ICategorieProps } from "@/components/atoms/CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { showToastify } from "@/hooks/showToastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function PageHome() {
  const { data: session } = useSession();
  const router = useRouter();

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [textSearched] = useDebounce(search, 1000);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [supplierCategoriesFilter, setSupplierCategoriesFilter] = useState("");

  const getAllCategories = async () => {
    const res: any = await SupplierService.getSupplierCategories();
    return res;
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSupplierCategoriesFilter((prevState) =>
      prevState === categoryId ? "" : categoryId,
    );
  };

  useEffect(() => {
    if (session?.user?.isSupplier) {
      if (!session?.user?.isVerified) {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }

    getAllCategories()
      .then((res) => setCategories(res?.data?.supplierCategories?.results))
      .catch((error) => {
        if (error?.response?.data?.code === 401) {
          showToastify({
            label: "Não autorizado. Por favor, autentique-se",
            type: "error",
          });
        }
        if (error?.response?.data?.code === 404) {
          showToastify({
            label: "Nenhuma categoria encontrada",
            type: "error",
          });
        }
      });
  }, [session, router]);

  function handleSetSearch(e: any) {
    setSearch(e.target.value);
    setPageNumber(1);
  }

  const handleResponse = (res: any) =>
    setSuppliers(res.data.results ? res.data.results : res.data);

  useEffect(() => {
    const getAllSuppliers = async (data: Partial<ISupplierList>) => {
      const res: any = await SupplierService.getSupplierList(data);

      if (res?.data?.totalPages <= pageNumber) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      return res;
    };

    const data = {
      page: pageNumber,
      ...(textSearched && { name: textSearched }),
      ...(supplierCategoriesFilter && {
        supplierCategory: supplierCategoriesFilter,
      }),
      isVerified: true,
      sortBy: "coupons:desc",
    };

    getAllSuppliers(data)
      .then(handleResponse)
      .catch((error) => {
        if (error?.response?.data?.code === 401) {
          showToastify({ label: "Usuário não autenticado", type: "error" });
        }
      });
  }, [textSearched, pageNumber, supplierCategoriesFilter]);

  return (
    <div className="md:w-[500px] w-full m-auto p-5 relative">
      <FloatButtonNav
        hasCouponActive={true}
        backgroundStyle="secondary"
        icon={CouponPrimary}
        href="/my-coupons"
      />
      <SearchCategory onChange={handleSetSearch} />
      <div className="flex flex-wrap my-6 w-full gap-3">
        {categories.map((category: ICategorieProps, index) => (
          <CategoryCard
            key={index}
            name={category.title}
            onClick={() => handleCategoryFilter(category.id)}
            image={imageCategory}
            isActive={category.id === supplierCategoriesFilter}
          />
        ))}
      </div>
      <InfiniteScroll
        className="flex flex-col gap-3"
        dataLength={suppliers.length}
        next={() => setPageNumber(pageNumber + 1)}
        hasMore={hasMore}
        loader={<h4 className=" m-4 text-primary-main">Carregando...</h4>}
        endMessage={<p className="m-4 text-primary-main text-center">...</p>}
      >
        {suppliers.map((supplier: ISuppliers, index) => (
          <SupplierCard
            supplierCategory={supplier?.supplierInfo?.supplierCategory?.title}
            supplierImage={SupplierLogo}
            avaliation="4.6"
            couponsAvaible={supplier.supplierInfo.coupons.length}
            name={supplier.name}
            key={supplier.id + index}
            id={supplier.id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PageHome;
