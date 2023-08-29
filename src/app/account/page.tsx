"use client";

import {
  FormItem, ButtonThird, ButtonBasic, ButtonSecondary,
  Input, ButtonPrimary
} from '@/components/atoms';
import * as Yup from "yup";
import { ModalEdit } from '@/components/mols/index';
import { useToastify } from '@/hooks/useToastify';
import usersService from '@/service/users.service';
import { userLoginResponseProps } from '@/types/user';
import { getItemByLocalStorage, removeItemFromLocalStorage } from '@/utils/localStorageHelper';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from "react";
import { IResetPasswordForm } from '@/types/auth';

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
    const [handleModal, setHandleModal] = useState(false)

    const ResetPasswordValidationSchema = Yup.object().shape({
      password: Yup.string()
        .matches(
          /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
          "Deve conter pelo menos uma letra e um número"
        )
        .required(
          "Coloque uma combinação de numeros, letras e sinais de pontuação (como ! e &)."
        )
        .min(8, "Senha deve conter no mínimo 8 caracteres.")
        .max(36, "Senha não deve contar mais de 36 caracteres"),
      conf_password: Yup.string()
        .required("Confirme sua senha.")
        .oneOf([Yup.ref("password")], "Senhas devem ser iguais."),
    });

    const initialValues: IResetPasswordForm = {
      password: '',
      conf_password: '',
    };

    const handleFormSubmit = (values: IResetPasswordForm) => {
      setLoading(true);
      if (user?.id) {
        console.log(user.id,values.password)
        usersService.updateUser( user.id , {password: values.password})
        .then(() => {
            useToastify({ label: 'Senha alterada com sucesso!', type: 'success' });
            setHandleModal(false);
          })
        .catch(() => {
            useToastify({ label: 'Oops! Algo deu errado. Verifique os campos e tente novamente', type: 'error' })
            setLoading(false);
          });
      };
    }

    return (
      <div className='relative h-max flex flex-col mx-auto gap-4 w-full max-w-md'>
        <ModalEdit
          show={handleModal}
          onCloseModalEdit={() => setHandleModal(false)}>
          {
            <Formik
              initialValues={initialValues}
              validationSchema={ResetPasswordValidationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <FormItem
                    label='nova senha'
                    errorMessage={errors.password}
                    invalid={!!(errors.password && touched.password)}
                  >
                    <Field
                      invalid={!!(errors.password && touched.password)}
                      name="password"
                      type="password"
                      label="Password"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label='repetir nova senha'
                    errorMessage={errors.conf_password}
                    invalid={!!(errors.conf_password && touched.conf_password)}
                  >
                    <Field
                      invalid={!!(errors.conf_password && touched.conf_password)}
                      name="conf_password"
                      type="password"
                      label="Password"
                      component={Input}
                    />
                  </FormItem>
                  <ButtonPrimary
                    type="submit"
                    className="w-full mt-6"
                    disabled={loading}
                    loading={loading}
                  >
                    Criar nova senha
                  </ButtonPrimary>
                </Form>
              )}
            </Formik>
          }
        </ModalEdit>
        <ButtonSecondary
          onClick={() => setHandleModal(true)}
          className='mt-4'>
          Trocar senha
        </ButtonSecondary>
        <ButtonThird>
          excluir conta
        </ButtonThird>
      </div>
    )
  };

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
          <div className="flex mx-4 gap-4 py-4 space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            <div
              className='font-normal text-neutral-400 hover:text-black'
              onClick={() => setPage(<Account />)}>
              conta
            </div>
            <div
              className='font-normal text-neutral-400 hover:text-black'
              onClick={() => setPage(<Security />)}>
              segurança
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
