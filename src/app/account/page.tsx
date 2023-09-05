"use client";

import {
  FormItem, ButtonThird, ButtonBasic, ButtonSecondary, ButtonPrimary, Input
} from '@/components/atoms';
import { ModalEdit } from '@/components/mols/index';
import { useToastify } from '@/hooks/useToastify';
import { userLoginResponseProps } from '@/types/user';
import { getItemByLocalStorage, removeItemFromLocalStorage } from '@/utils/localStorageHelper';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState, useRef } from "react";
import authService from '@/service/auth.service';
import usersService from '@/service/users.service';

const MyAccountPage = () => {
  const [user, setUser] = useState<userLoginResponseProps>();
  const [page, setPage] = useState<ReactElement>()
  const router = useRouter();

  useEffect(() => {
    const user = getItemByLocalStorage('user')
    if (!user) return router.push('/')
    setUser(user)
    setPage(<Account />)
  }, []);

  const Account = () => {
    const [user, setUser] = useState<userLoginResponseProps>();
    useEffect(() => {
      setUser(getItemByLocalStorage('user'))
    }, []);

    function handleDisconnect() {
      removeItemFromLocalStorage('user')
      router.push('/login')
    }

    return (
      <div className='relative h-max flex flex-col mx-auto gap-4 w-full max-w-md'>
        <FormItem label='Nome'>
          <div className='ml-2 text-lg font-medium text-neutral-600'>
            {user?.name}
          </div>
        </FormItem>
        <FormItem label='Email'>
          <div className='ml-2 text-lg font-medium text-neutral-600'>
            {user?.email}
          </div>
        </FormItem>

        <ButtonBasic
          onClick={() => handleDisconnect()}>
          deconectar
        </ButtonBasic>
      </div>
    )
  };

  const Security = () => {
    const [loading, setLoading] = useState(false);
    const [handleModal, setHandleModal] = useState(false);
    const [emailSendButton, setEmailSendButton] = useState('Trocar senha')
    const [password, setPassword] = useState('');
    const [disableButtonSendEmail, setDisableButtonSendEmail] = useState(false)

    const handleDeleteUser = async () => {
      if (user) {
        await usersService.eraseUser(user.id, password)
          .then(() => {
            useToastify({ label: 'Usuário deletado com sucesso', type: 'success' })
            router.push('/login')
          })
          .catch(() =>
            useToastify({ label: "Ocorreu um erro ao deletar a conta. Por favor, tente novamente mais tarde.", type: "error" })
          )
      };
      setHandleModal(false)
    };

    const handleSendEmailChangePassword = async () => {
      setLoading(true)
      if (user) {
        await authService.forgotPassword({ email: user?.email })
          .then(() => { useToastify({ label: 'Foi enviado um link para redefinir a senha ao endereço de email cadastrado.', type: 'success' }) })
          .then(() => setDisableButtonSendEmail(true))
          .catch(() => {
            useToastify({ label: 'Oops! Algo deu errado. Tente novamente mais tarde', type: 'error' })
          })
        setLoading(false)
        setEmailSendButton('Email para trocar senha enviado')
      }
    };

    return (
      <div className='relative h-max flex flex-col mx-auto gap-4 w-full max-w-md'>
        <ModalEdit show={handleModal} onCloseModalEdit={() => setHandleModal(false)} >
          <div className='flex flex-col h-[85vh]'>
          <div className='mt-8 mb-16 flex items-center justify-between'>
            <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black justify-center">
              Confirmar
            </h2>
            <div>
              <div className='relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
                <div className='absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
                </div>
              </div>
            </div>
          </div>
          <p className='my-4 text-black'>Ao excluir a conta, os seus dados e reservas serão apagados do nosso sistema!</p>
          <hr className="border-slate-200 dark:border-slate-700 mb-6"></hr>
          <FormItem label='senha'>
            <Input type='password' onChange={(e)=> setPassword(e.target.value)}></Input>
          </FormItem>
          <ButtonPrimary
            className='my-8'
            onClick={() => handleDeleteUser()}>
            Excluir conta
          </ButtonPrimary>
          <ButtonThird onClick={() => setHandleModal(false)}>
            cancelar
          </ButtonThird>
            
          </div>
          
        </ModalEdit>
        <ButtonSecondary
          onClick={() => handleSendEmailChangePassword()}
          loading={loading}
          disabled={disableButtonSendEmail}
          className='mt-4'>
          {emailSendButton}
        </ButtonSecondary>
        <ButtonThird
          onClick={() => setHandleModal(true)}>
          excluir conta
        </ButtonThird>
      </div>
    )
  };

  const divAccount = useRef<HTMLDivElement>(null)
  const divSecurity = useRef<HTMLDivElement>(null)

  const handleChangeColorToggle = (e: React.RefObject<HTMLDivElement>) => {
    if (e === divAccount) {
      e.current?.classList.replace('text-neutral-400', 'text-black')
      divSecurity.current?.classList.replace('text-black', 'text-neutral-400')
      setPage(<Account />)
    }
    if (e === divSecurity) {
      e.current?.classList.replace('text-neutral-400', 'text-black')
      divAccount.current?.classList.replace('text-black', 'text-neutral-400')
      setPage(<Security />)
    }
  }

  return (
    <div className="nc-AccountCommonLayout container">
      <div className='mt-8 mb-16 flex items-center justify-between'>
        <h2 className=" flex flex-wrap items-center text-2xl leading-[115%] md:leading-[115%] font-bold text-black justify-center">
          {user?.name}
        </h2>
        <div>
          <div className='relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
            <div className='absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <hr className="mt-10 border-slate-200 "></hr>
          <div className="mx-4 py-4 space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            <div className='flex gap-6'>
              <div
                className='font-normal cursor-pointer text-black hover:text-black'
                ref={divAccount}
                onClick={() => handleChangeColorToggle(divAccount)}>
                conta
              </div>
              <div
                className='font-normal cursor-pointer text-neutral-400 hover:text-black'
                ref={divSecurity}
                onClick={() => handleChangeColorToggle(divSecurity)}>
                segurança
              </div>
            </div>


          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl h-full mx-auto pt-14 sm:pt-26 pb-12 lg:pb-12">
        {page}
      </div>
    </div>
  );
};

export default MyAccountPage;
