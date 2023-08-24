"use client"

import React, {useEffect , useState} from 'react';
import { Avaliation, SupplierCoupons } from '@/components/atoms/index';
import Image from 'next/image';
import BgSupplierExample from '@/images/easytolive/supplier/example-bg-supplier-dashboard.jpg';
import SupplierService from '@/service/supplier.service';
import {ISupplier} from '@/types/supplier'
import SupplierLogo from '@/images/easytolive/logo/logotipo-fundoazulroxo.svg'
import { useToastify } from '@/hooks/useToastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface tokenProps {
  params: {
    id: string
  }
}

const SupplierDashBoard = ({ params }: tokenProps )=> {
  const [supplier, setSupplier] = useState<ISupplier>()
  const router = useRouter()

  function handleClickRedirect(e: string) {
    router.push(`/coupons/${e}`)
  }

  const getSupplierById = async(id:string) => {
    const res: any = await SupplierService.getSupplierById(id)
    return res
  }

  useEffect(()=>{
    getSupplierById(params.id)
    .then((res)=> {setSupplier(res?.data?.supplier)})
    .catch((error)=>{
      if(error?.response?.data?.code === 400) {
        useToastify({ label: 'Oops! Parece que você acessou um endereço de estabelcimento errado', type: 'error'})
      }
    })
  },[])

  return (
    <div className='relative'>
      <Image
      className='w-full max-w-md'
      alt='bg-supplier-example'
      src={BgSupplierExample}/>
      <div
      className='absolute top-40 py-8 px-5 rounded-t-3xl bg-primary-ez2livebg w-full'>
        <div
        className='flex items-center justify-between'>
          <div className='flex gap-1'>
          <p className='text-xs'>
            {supplier?.supplierCategory.title} /  
          </p>
          <Link
          href={`/supplier-dashboard/${params.id}`} className='text-xs underline'>
          {supplier?.name}</Link>
          </div>
          <Avaliation note={'4.7'} />
        </div>
        <Image
        className='w-12 my-4 h-auto rounded-full'
        alt='Logo Image'
        src={SupplierLogo}
        />

        <h2 className=' text-xl font-semibold'>{supplier?.name}</h2>
        <p className='pt-2 text-xs text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi vero velit quam repellendus facere ea recusandae, sapiente repudiandae perspiciatis temporibus et exercitationem illum nobis corrupti, sunt voluptates perferendis dicta fugiat.</p>
        <div className='mt-4 flex flex-col gap-4'>

        { supplier?.coupons && (
          supplier?.coupons.map((coupon, key)=> (
            <SupplierCoupons
            discount={coupon.discount}
            expirateTime={5}
            products='todos os produtos'
            unintsAmount={20}
            key={key}
            onClick={()=> handleClickRedirect(coupon.id)}
            />))
          )
        }
        </div>  
        </div>
      </div>
  );
};

export default SupplierDashBoard;
