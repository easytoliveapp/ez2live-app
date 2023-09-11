"use client"

import React, { useEffect, useState } from 'react';
import { Avaliation, SupplierCoupons } from '@/components/atoms/index';
import Image from 'next/image';
import SupplierService from '@/service/supplier.service';
import { ISupplier } from '@/types/supplier'
import SupplierLogo from '@/images/easytolive/logo/logotipo-fundoazulroxo.svg'
import Arrow from '@/images/easytolive/icons/arrow-next-right-white.svg'
import { useToastify } from '@/hooks/useToastify';
import Link from 'next/link';

interface tokenProps {
  params: {
    id: string
  };
};

const SupplierDashBoard = ({ params }: tokenProps) => {
  const [supplier, setSupplier] = useState<ISupplier>();

  const getSupplierById = async (id: string) => {
    const res: any = await SupplierService.getSupplierById(id);
    return res;
  };

  useEffect(() => {
    getSupplierById(params.id)
      .then((res) => { setSupplier(res?.data?.supplier) })
      .catch((error) => {
        if (error?.response?.data?.code === 400) {
          useToastify({ label: 'Oops! Parece que você acessou um endereço de estabelcimento errado', type: 'error' })
        }
      });
  }, []);

  return (
    <div className="relative md:w-[500px] h-full w-full mx-auto">
      <div className='h-40 w-full bg-gradient-to-r from-primary-ez2lliveBlue to-primary-ez2live'>
      </div>
      <Link className='absolute flex items-center justify-center rounded-full top-4 left-4 cursor-pointer h-8 w-8 bg-neutral-400 opacity-75 rotate-180'
      href={'/'}>
        <Image 
        className='w-6 h-auto' 
        alt='arrow-left' 
        src={Arrow}/>
      </Link>
      <Image className='absolute rounded-full w-20 h-auto top-8 right-4' src={SupplierLogo} alt='Logo-restaurante' />
      <div className='px-5 py-6 -mt-6 rounded-t-3xl bg-primary-ez2livebg w-full h-full'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-1'>
            <Link href={`/`} className='text-xs underline'>
              {supplier?.supplierCategory.title}
            </Link>
            <p className='text-xs'>
              / {supplier?.name}
            </p>
          </div>
          <Avaliation note={'4.7'} />
        </div>
        <Image
          className='w-12 my-4 h-auto rounded-full'
          alt='Logo Image'
          src={SupplierLogo}
        />

        <h2 className=' text-xl font-semibold'>{supplier?.name}</h2>
        <p className='pt-2 text-xs text-gray-400'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi vero velit quam repellendus facere ea recusandae, sapiente repudiandae perspiciatis temporibus
          et exercitatione illum nobis corrupti, sunt voluptates perferendis dicta fugiat.</p>
        <div className='mt-6 pb-16 flex flex-col gap-4'>

          {supplier?.coupons && (supplier?.coupons.map((coupon, key) => (
            <SupplierCoupons
              supplierCategory={supplier.supplierCategory.title}
              supplierName={supplier.name}
              id={coupon.id}
              discount={coupon.discount}
              expirateTime={5}
              unintsAmount={20}
              key={key}
              supplierLogo= {SupplierLogo}
            />
          )))
          }

        </div>
      </div>
      <span className='md:w-[500px] fixed bottom-0 text-neutral-400 w-full flex justify-center items-center h-16 bg-alternative-darker'>
        Todos os direitos reservados
      </span>
    </div>
  );
};

export default SupplierDashBoard;
