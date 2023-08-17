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


function PageHome() {
  const [suppliers , setSuppliers] = useState([])
  const [search, setSearch] = useState('');
  const [ value ] = useDebounce(search, 1000);
  const [categorys, setCategorys] = useState([])
  // const [selectedCategory, setSelectedCategory] = useState('')

  const getAllCategorys = async () => {
    const res : any = await Sup.getSupplierCategories();
    return res;
  }
  useEffect(()=>{
    getAllCategorys()
    .then((res)=> setCategorys(res.data.supplierCategories.results))
    .catch((error)=> console.log(error))
  
  },[])

  function handleSetSearch(e: any) {
    setSearch(e.target.value)
  }

  const getAllSuppliers = async (e?:string)=> {
    const res: any = await Sup.getSupplierList({name: e})
    return res
  }

  useEffect(()=>{
    if (!value) {
      getAllSuppliers()
      .then((res: any)=> setSuppliers(res.data.results))
      .catch((error)=> console.log(error))
    }
    else {
      getAllSuppliers(value)
      .then((res: any)=> setSuppliers(res.data.results))
      .catch((error)=> console.log(error))
    }
  },[value])


  return (
    <div className="nc-PageHome relative overflow-hidden flex flex-col justify-center items-center w-full gap-3 p-5">
      <SearchCategory 
      onChange={handleSetSearch}
      />
      <div className='flex flex-wrap w-full gap-3'>
        {
          categorys.map((category: categorieProps, index)=> (
            <CategoryCard key={index} name={category.title} image={imageCategory}/>
          ))
        }
    </div>
      {suppliers.map((supplier:ISupplier)=> (
        <SupplierCard
        supplierCategory={supplier.supplierCategory.title}
        supplierImage={SupLogo}
        avaliation='4.6'
        couponsAvaible={'4'}
        name={supplier.name}
        key={supplier.id}/>
      ))}
    </div>
  );
}

export default PageHome;
