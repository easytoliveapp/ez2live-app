"use client"

import React, { useEffect, useState } from "react";
import { SupplierCard } from '@/components/mols';
import { CategoryCard } from '@/components/atoms'
import SupplierLogo from '@/images/easytolive/logo/logotipo-fundoazulroxo.svg'
import SearchCategory from '@/app/searchCategory'
import SupplierService from '@/service/supplier.service'
import imageCategory from '@/images/easytolive/icons/categorie-example.svg'
import { ISupplier, ISupplierList } from '@/types/supplier';
import { useDebounce } from 'use-debounce';
import { categorieProps } from '@/components/atoms/CategoryCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useToastify } from "@/hooks/useToastify";
import { userLoginResponseProps } from "@/types/user";
import { getItemByLocalStorage } from "@/utils/localStorageHelper";
import { useRouter } from "next/navigation";

function PageHome() {
  const router = useRouter();

  const [suppliers , setSuppliers] = useState([])
  const [search, setSearch] = useState('');
  const [textSearched] = useDebounce(search, 1000);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [supplierCategoriesFilter, setSupplierCategoriesFilter] = useState('');
  const [user, setUser] = useState<userLoginResponseProps>();

  const getAllCategories = async () => {
    const res: any = await SupplierService.getSupplierCategories();
    return res;
  }

  const handleCategoryFilter = (categoryId: string) => {
    setSupplierCategoriesFilter(prevState => prevState === categoryId ? '' : categoryId);
  }

  useEffect(() => {
    const user = getItemByLocalStorage('user');
    if (!user) return router.push('/login');

    setUser(user);

    getAllCategories()
      .then((res) => setCategories(res?.data?.supplierCategories?.results))
      .catch((error) => {
        if (error?.response?.data?.code === 401) {
          useToastify({ label: 'Não autorizado. Por favor, autentique-se', type: 'error' });
        }
        if(error?.response?.data?.code === 404) {
          useToastify({ label: 'Nenhuma categoria encontrada', type: 'error' });
        }
      });
  }, []);

  function handleSetSearch(e: any) {
    setSearch(e.target.value)
    setPageNumber(1);
  }

  const getAllSuppliers = async (data : Partial<ISupplierList> ) => {
    const res: any = await SupplierService.getSupplierList(data);

    if (res?.data?.totalPages <= pageNumber ) {
      setHasMore(false)
    }
    else {
      setHasMore(true)
    }
    return res;
  }

  const handleResponse = (res: any)=>
    setSuppliers( 
      pageNumber === 1 
        ? res?.data?.results 
        : suppliers.concat(res?.data?.results)
    );

  useEffect(() => {
    const data = {
      page: pageNumber,
      ...(textSearched && { name: textSearched }),
      ...(supplierCategoriesFilter && { supplierCategory: supplierCategoriesFilter }),
      sortBy: 'coupons:desc',
    };

     getAllSuppliers(data)
      .then(handleResponse)
      .catch((error)=> {
        if (error?.response?.data?.code === 401) {
          useToastify({ label: 'Usuário não autenticado', type: 'error' })
        }
      })
  }, [textSearched, pageNumber, supplierCategoriesFilter]);

  return user && (
    <div className="md:w-[500px] w-full m-auto">
      <SearchCategory onChange={handleSetSearch} />
      <div className='flex flex-wrap my-6 w-full gap-3'>
        {
          categories.map((category: categorieProps, index)=> (
            <CategoryCard
              key={index}
              name={category.title}
              onClick={() => handleCategoryFilter(category.id)}
              image={imageCategory}
              isActive={category.id === supplierCategoriesFilter}
            />
          ))
        }
      </div>
      <InfiniteScroll
        className='flex flex-col gap-3'
        dataLength={suppliers.length}
        next={()=> setPageNumber(pageNumber + 1)}
        hasMore={hasMore}
        loader={<h4 className=' m-4 text-primary-ez2live'>Carregando...</h4>}
        endMessage={<p className='m-4 text-primary-ez2live text-center'>...</p>}
      >
        {suppliers.map((supplier :ISupplier) => (
          <SupplierCard
            supplierCategory={supplier?.supplierCategory?.title}
            supplierImage={SupplierLogo}
            avaliation='4.6'
            couponsAvaible={supplier.numberOfCoupons}
            name={supplier.name}
            key={supplier.id}
            id={supplier.id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PageHome;
