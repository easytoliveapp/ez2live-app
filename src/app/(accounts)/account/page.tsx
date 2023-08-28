"use client"
import { FormItem, Input, ButtonPrimary } from '@/components/atoms';
import { userLoginResponseProps } from '@/types/user';
import { getItemByLocalStorage } from '@/utils/localStorageHelper';
import React, { useEffect, useState } from 'react';

const ProfilePage = ()=> {
  const [user, setUser] = useState<userLoginResponseProps>();
  
  useEffect(() => {
    setUser(getItemByLocalStorage('user'))
  }, []);

  return (
    <div className='relative h-max flex flex-col mx-auto gap-4 w-full max-w-md'>
      <FormItem
        label='nome'>
          <Input defaultValue={user?.name} />
        </FormItem>

        <FormItem
        label='email'>
          <Input disabled placeholder={user?.email}/>
        </FormItem>

        <ButtonPrimary
        className='mt-6 bg-secondary-ez2live font-bold !text-black !shadow-none'>
          Trocar senha
        </ButtonPrimary>

        <ButtonPrimary
        className='bg-primary-ez2livebg !text-black !font-bold !shadow-none'>
          deconectar
        </ButtonPrimary>
        <ButtonPrimary
        className='mt-[14vh] bg-primary-ez2livebg !text-red-500 !font-bold !shadow-none'>
          excluir conta
        </ButtonPrimary>
    </div>
  )
}

export default ProfilePage;
