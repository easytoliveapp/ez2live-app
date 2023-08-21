"use client"

import React, { useEffect, useState } from "react";
import { SupplierCard } from '@/components/mols';
import { CategoryCard } from '@/components/atoms'
import SupLogo from '@/images/easytolive/logo/logotipo-fundoazulroxo.svg'
import SearchCategory from '@/app/searchCategory'
import supplierService from '@/service/supplier.service'
import imageCategory from '@/images/easytolive/icons/categorie-example.svg'
import { ISupplier, ISupplierList } from '@/types/supplier';
import { useDebounce } from 'use-debounce';
import { categorieProps } from '@/components/atoms/CategoryCard';
import InfiniteScroll from 'react-infinite-scroll-component';

function PageHome() {
  const [suppliers , setSuppliers] = useState([])
  const [search, setSearch] = useState('');
  const [textSearched] = useDebounce(search, 1000);
  const [categorys, setCategorys] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [supplierCategoryFilter, setSupplierCategoryFilter] = useState('');

  const getAllCategorys = async () => {
    const res: any = await supplierService.getSupplierCategories();
    return res;
  }

  useEffect(() => {
    getAllCategorys()
    .then((res)=> setCategorys(res?.data?.supplierCategories?.results))
    .catch((error)=> console.log(error))
  },[]);

  function handleSetSearch(e: any) {
    setSearch(e.target.value)
    setPageNumber(1);
  }

  const getAllSuppliers = async (data : Partial<ISupplierList> ) => {
    const res: any = await supplierService.getSupplierList(data);

    if (res?.data?.totalPages <= pageNumber ) {
      setHasMore(false)
    }
    else {
      setHasMore(true)
    }
    console.log(data)
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
      ...(textSearched ? { name: textSearched } : {}),
      ...(supplierCategoryFilter ? { supplierCategory: supplierCategoryFilter } : {}),
    };

     getAllSuppliers(data)
      .then(handleResponse)
      .catch((error)=> console.log(error))
  }, [textSearched, pageNumber, supplierCategoryFilter]);

  return (
    <div className="md:w-[500px] w-full m-auto p-5">
      <SearchCategory onChange={handleSetSearch} />
      <div className='flex flex-wrap my-6 w-full gap-3'>
        {
          categorys.map((category: categorieProps, index)=> (
            <CategoryCard key={index} name={category.title} onClick={()=>setSupplierCategoryFilter(category.id)} image={imageCategory}/>
          ))
        }
      </div>
      <InfiniteScroll
      className='flex flex-col gap-3'
      dataLength={suppliers.length}
      next={()=> setPageNumber(pageNumber + 1)}
      hasMore={hasMore}
      loader={<h4 className=' m-4 text-primary-ez2live'>Carregando...</h4>}
      endMessage={<p className='m-4 text-primary-ez2live'>Todos estabelecimentos carregados!</p>}
      >
      
      {suppliers.map((supplier :ISupplier) => (
        <SupplierCard
          supplierCategory={supplier?.supplierCategory?.title}
          supplierImage={SupLogo}
          avaliation='4.6'
          couponsAvaible={supplier.numberOfCoupons}
          name={supplier.name}
          key={supplier.id}
        />
      ))}
      </InfiniteScroll>
    </div>
  );
}

export default PageHome;
