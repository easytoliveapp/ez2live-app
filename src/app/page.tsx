"use client";

import React, { useEffect, useState } from "react";
import { SupplierCard } from "@/components/mols";
import {
  CategoryCard,
  CompleteSupplierRegister,
  FloatButtonNav,
} from "@/components/atoms";
import SupplierLogo from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import SearchCategory from "@/app/searchCategory";
import SupplierService from "@/service/supplier.service";
import imageCategory from "@/images/easytolive/icons/categorie-example.svg";
import { ISuppliers, ISupplierList } from "@/types/supplier";
import { useDebounce } from "use-debounce";
import { categorieProps } from "@/components/atoms/CategoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { showToastify } from "@/hooks/showToastify";
import ModalEdit from "@/components/mols/Modal/ModalEdit";
import ButtonThird from "@/components/atoms/Button/ButtonThird";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function PageHome() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [textSearched] = useDebounce(search, 1000);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [supplierCategoriesFilter, setSupplierCategoriesFilter] = useState("");
  const [
    ControlModalSupplierUploadRegister,
    setControlModalSupplierUploadRegister,
  ] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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
        router.push("/supplier-not-verified");
      } else {
        setControlModalSupplierUploadRegister(true);
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
  }, []);

  function handleSetSearch(e: any) {
    setSearch(e.target.value);
    setPageNumber(1);
  }

  const getAllSuppliers = async (data: Partial<ISupplierList>) => {
    const res: any = await SupplierService.getSupplierList(data);

    if (res?.data?.totalPages <= pageNumber) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    return res;
  };

  const handleResponse = (res: any) =>
    setSuppliers(
      pageNumber === 1
        ? res?.data?.results
        : suppliers.concat(res?.data?.results),
    );

  useEffect(() => {
    const data = {
      page: pageNumber,
      ...(textSearched && { name: textSearched }),
      ...(supplierCategoriesFilter && {
        "supplierInfo.supplierCategory": supplierCategoriesFilter,
      }),
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
        couponActive={true}
        backGround="secondary"
        icon={CouponPrimary}
        href="/"
      />
      <ModalEdit
        show={ControlModalSupplierUploadRegister}
        onCloseModalEdit={() => setControlModalSupplierUploadRegister(false)}
      >
        <div className="h-[85vh] flex flex-col items-center justify-around">
          <CompleteSupplierRegister />
          <ButtonThird
            onClick={() => setControlModalSupplierUploadRegister(false)}
          >
            cancelar
          </ButtonThird>
        </div>
      </ModalEdit>
      <SearchCategory onChange={handleSetSearch} />
      <div className="flex flex-wrap my-6 w-full gap-3">
        {categories.map((category: categorieProps, index) => (
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
