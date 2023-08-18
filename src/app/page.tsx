"use client"

import React, { useEffect, useState } from "react";
import { SupplierCard } from '@/components/mols';
import { CategoryCard } from '@/components/atoms'
import SupLogo from '@/images/easytolive/logo/logotipo-fundoazulroxo.svg'
import SearchCategory from '@/app/searchCategory'
import Sup from '@/service/supplier.service'
import imageCategory from '@/images/easytolive/icons/categorie-example.svg'
import { ISupplier } from '@/types/supplier';
import { useDebounce } from 'use-debounce';
import { categorieProps } from '@/components/atoms/CategoryCard';
import InfiniteScroll from 'react-infinite-scroll-component';


function PageHome() {
  const [suppliers , setSuppliers] = useState([])
  const [search, setSearch] = useState('');
  const [ value ] = useDebounce(search, 1000);
  const [categorys, setCategorys] = useState([]);
  const [pageFetch, setPageFetch] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const [selectedCategory, setSelectedCategory] = useState('')

  const getAllCategorys = async () => {
    const res : any = await Sup.getSupplierCategories();
    return res;
  }

  useEffect(()=>{
    getAllCategorys()
    .then((res)=> setCategorys(res?.data?.supplierCategories?.results))
    .catch((error)=> console.log(error))
  },[])

  function handleSetSearch(e: any) {
    setPageFetch(1)
    setSearch(e.target.value)
  }

  const getAllSuppliers = async (page?: number , name?:string)=> {
    const res: any = await Sup.getSupplierList({name: name , page: page})
    if (res?.data?.totalPages <= pageFetch ) {
      setHasMore(false)
    }
    else {
      setHasMore(true)
    }
    console.log('fetch')
    return res
  }

  useEffect(()=>{
    if(pageFetch == 1) {
      if (!value) {
        getAllSuppliers(pageFetch)
        .then((res: any)=> setSuppliers(res?.data?.results))
        .catch((error)=> console.log(error))
      }
      else {
        getAllSuppliers(pageFetch, value)
        .then((res: any)=> setSuppliers(res?.data?.results))
        .catch((error)=> console.log(error))
      }
    } else {
      if (!value) {
        getAllSuppliers(pageFetch)
        .then((res: any)=> setSuppliers(suppliers.concat(res?.data?.results)))
        .catch((error)=> console.log(error))
      }
      else {
        getAllSuppliers(pageFetch, value)
        .then((res: any)=> setSuppliers(suppliers.concat(res?.data?.results)))
        .catch((error)=> console.log(error))
      }
    }
  },[value,pageFetch])

  return (
    <div className="w-full m-auto p-5">
      <SearchCategory 
      onChange={handleSetSearch}
      />
      <div className='flex flex-wrap my-6 w-full gap-3'>
        {
          categorys.map((category: categorieProps, index)=> (
            <CategoryCard key={index} name={category.title} image={imageCategory}/>
          ))
        }
    </div>
      <InfiniteScroll
      className='flex flex-col gap-3'
      dataLength={suppliers.length}
      next={()=> setPageFetch(pageFetch + 1)}
      hasMore={hasMore}
      loader={<h4 className=' m-4 text-primary-ez2live'>Carregando...</h4>}
      endMessage={<p className='m-4 text-primary-ez2live'>Todos estabelecimentos carregados!</p>}
      >
      
      {suppliers.map((supplier:ISupplier)=> (
        <SupplierCard
        supplierCategory={supplier?.supplierCategory?.title}
        supplierImage={SupLogo}
        avaliation='4.6'
        couponsAvaible={supplier.numberOfCoupons}
        name={supplier.name}
        key={supplier.id}/>
      ))}
      </InfiniteScroll>
    </div>
  );
}

export default PageHome;
