"use client";

import {
  FormItem,
  ButtonThird,
  ButtonBasic,
  ButtonSecondary,
  ButtonPrimary,
  Input,
  Modal,
} from "@/components";
import { showToastify } from "@/hooks/showToastify";
import { type IDeleteUSer } from "@/types/user";
import Image from "next/image";
import dayjs from "dayjs";
import * as Yup from "yup";
import React, { useState, useCallback } from "react";
import authService from "@/service/auth.service";
import usersService from "@/service/users.service";
import { Field, Form, Formik } from "formik";
import classNames from "@/utils/classNames";
import { signOut, useSession } from "next-auth/react";
import { getDateFormater } from "@/utils/getDateFormater";
import useUserRoles from "@/hooks/useUserRoles";
import isDateValid from "@/utils/isDateValid";
import EasyLogo from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";

const MyAccountPage = () => {
  const { data: session } = useSession();
  const [pageId, setPageId] = useState<string>("account");
  const [openCancelSignatureModal, SetOpenCancelSignatureModal] =
    useState(false);

  const Account = () => {
    return (
      <div className="relative h-max flex flex-col mx-auto gap-4 w-full max-w-md">
        {!useUserRoles().isCommonUser() && (
          <div className=" bg-primary-main mb-4 rounded-2xl px-4 py-1 mx-auto text-white font-semibold">
            {session?.user.role}
          </div>
        )}

        <FormItem label="Nome">
          <div className="ml-2 text-lg font-medium text-neutral-600">
            {session?.user?.name}
          </div>
        </FormItem>
        <FormItem label="Email">
          <div className="ml-2 text-lg font-medium text-neutral-600">
            {session?.user?.email}
          </div>
        </FormItem>
        <FormItem label="Premium">
          <div className="ml-2 text-lg font-medium text-neutral-600">
            {session?.user.subscriptionEndDate !== null &&
            dayjs(session?.user.subscriptionEndDate).isAfter(dayjs())
              ? `Validade: ${getDateFormater(
                  session?.user?.subscriptionEndDate,
                )}`
              : "Expirou"}
          </div>
        </FormItem>

        <ButtonBasic onClick={() => signOut({ redirect: true })}>
          Desconectar
        </ButtonBasic>
      </div>
    );
  };

  const Security = () => {
    const [loading, setLoading] = useState(false);
    const [handleModal, setHandleModal] = useState(false);
    const [emailSendButton, setEmailSendButton] = useState("Trocar senha");
    const [disableButtonSendEmail, setDisableButtonSendEmail] = useState(false);

    const DeleteUserValidationSchema = Yup.object().shape({
      password: Yup.string().required("Digite a sua senha."),
    });

    const handleDeleteUser = async (values: IDeleteUSer) => {
      setLoading(true);
      if (session?.user) {
        await usersService
          .eraseUser(session?.user.id, values.password)
          .then(() => {
            setTimeout(() => signOut({ redirect: true }), 1500);
            showToastify({
              label: "Conta excluída com sucesso",
              type: "success",
            });
          })
          .catch(() => {
            showToastify({
              label:
                "Ocorreu um erro ao deletar a conta. Por favor, tente novamente mais tarde.",
              type: "error",
            });
            setLoading(false);
          });
      }
      setHandleModal(false);
    };

    const handleSendEmailChangePassword = async () => {
      setLoading(true);

      if (session?.user && session?.user.email) {
        await authService
          .forgotPassword({ email: session?.user.email })
          .then(() => {
            showToastify({
              label:
                "Foi enviado um link para redefinir a senha ao endereço de email cadastrado.",
              type: "success",
            });
            setDisableButtonSendEmail(true);
          })
          .catch(() => {
            showToastify({
              label: "Oops! Algo deu errado. Tente novamente mais tarde",
              type: "error",
            });
          });

        setLoading(false);
        setEmailSendButton("E-mail enviado");
      }
    };

    return (
      <div className="relative h-max flex flex-col mx-auto gap-4 w-full max-w-md">
        <Modal
          show={handleModal}
          onCloseModal={() => {
            setHandleModal(false);
          }}
        >
          <div className="flex flex-col h-[85vh]">
            <div className="mt-8 mb-16 flex items-center justify-between">
              <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black justify-center">
                Confirmar
              </h2>
              <div>
                <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-ligther">
                  <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-ligther"></div>
                </div>
              </div>
            </div>
            <p className="my-4 text-black">
              Ao apagar sua conta, todas as suas reservas e outros dados serão
              apagados <b>permanentemente</b> do nosso sistema. Se você tem
              certeza disso, digite a senha da sua conta.
            </p>
            <hr className="border-slate-200 dark:border-slate-700 mb-6"></hr>

            <Formik
              initialValues={{
                password: "",
              }}
              validationSchema={DeleteUserValidationSchema}
              onSubmit={handleDeleteUser}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <FormItem
                    label="senha"
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
                  <span className="flex justify-end  items-start text-sm"></span>
                  <ButtonPrimary
                    className="my-6"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Excluir conta
                  </ButtonPrimary>
                  <ButtonThird
                    onClick={() => {
                      setHandleModal(false);
                    }}
                  >
                    Cancelar
                  </ButtonThird>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
        <ButtonSecondary
          onClick={async () => {
            await handleSendEmailChangePassword();
          }}
          loading={loading}
          disabled={disableButtonSendEmail}
          className="mt-4"
        >
          {emailSendButton}
        </ButtonSecondary>
        <ButtonThird
          onClick={() => {
            setHandleModal(true);
          }}
        >
          Excluir conta
        </ButtonThird>
      </div>
    );
  };

  const Signature = () => {
    if (session === null) return <div>sessão indisponível</div>;
    const { subscriptionEndDate } = session.user;
    const hasSignature = isDateValid(subscriptionEndDate);
    return hasSignature ? (
      <div className="flex flex-col items-center justify-center text-center">
        <Image src={EasyLogo} width={40} height={40} alt="logo-image" />
        <h2 className="text-lg font-semibold">
          Você está há 1 passo de <br /> economizar ainda mais!
        </h2>
        <p>
          Seja um assinante EasyToLive e tenha acesso <br />
          aos melhores descontos em nosso app
        </p>
        <ButtonPrimary className="!bg-generic-alertGreen !px-4 !py-2 !text-sm !font-bold">
          Quero os melhores descontos
        </ButtonPrimary>
      </div>
    ) : (
      <div>
        <div className=" grid grid-cols-2 items-center">
          <div>
            <p className="font-bold">Status Assiantura</p>
            <span>
              {hasSignature ? (
                <p className="text-generic-alertGreen font-semibold">Ativa</p>
              ) : (
                <p className="font-semibold"> Inativa</p>
              )}
            </span>
          </div>
          <div>
            <p className="font-bold">Última cobrança</p>
            <span>04/05/2024 as 10:23</span>
          </div>
          <div>
            <p className="font-bold">Plano</p>
            <span>EasyToLive Mensal</span>
          </div>
          <div>
            <p className="font-bold">ID da assinatura</p>
            <span>LASK001-02NDKKS-190SDKND-293KD</span>
          </div>
          <div>
            <p className="font-bold">Próxima cobrança</p>
            <span>04/06/2024</span>
          </div>
        </div>
        <ButtonThird
          className="!text-generic-alertRed"
          onClick={() => SetOpenCancelSignatureModal(true)}
        >
          Cancelar Assinatura
        </ButtonThird>
      </div>
    );
  };

  const TabComponent = useCallback(() => {
    if (pageId === "account") {
      return <Account />;
    } else if (pageId === "security") {
      return <Security />;
    } else if (pageId === "signature") {
      return <Signature />;
    } else {
      return <Account />;
    }
  }, [pageId]);

  return (
    <div className="nc-AccountCommonLayout container">
      <Modal
        closeOnBlur={true}
        hasCloseButton={true}
        show={openCancelSignatureModal}
        onCloseModal={() => SetOpenCancelSignatureModal(false)}
      >
        <h2 className="text-lg font-semibold">
          Tem certeza que deseja cancelar sua assinatura
        </h2>
        <p>
          Se você cancelar a assinatura{" "}
          <strong>perderá acesso aos melhores descontos</strong> que
          selecionamos para você.
        </p>
        <p>
          {" "}
          Você pode cancelar a qualquer momento e encerrar a recorrência do
          ciclo em <strong>10/05/2025</strong>
        </p>
        <p>
          <strong>Até lá você ainda pode aproveitar</strong>
          <br /> nossos melhores descontos.
        </p>
        <ButtonPrimary className="!text-generic-alertRed"></ButtonPrimary>
        <ButtonThird
          className="!text-generic-alertGreenLight"
          onClick={() => SetOpenCancelSignatureModal(false)}
        >
          {" "}
          Permanecer Assinante Easy{" "}
        </ButtonThird>
      </Modal>
      <div className="mt-8 mb-8 flex items-center justify-between">
        <h2 className=" flex flex-wrap items-center text-2xl leading-[115%] md:leading-[115%] font-bold text-black justify-center">
          {session?.user?.name}
        </h2>
        <div>
          <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-ligther">
            <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-ligther"></div>
          </div>
        </div>
      </div>
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <hr className="mt-10 border-slate-200 "></hr>
          <div className="mx-4 py-4 space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            <div className="flex gap-6">
              <div
                className={classNames(
                  "font-normal cursor-pointer text-black",
                  pageId === "account" ? "opacity-100" : "opacity-60",
                )}
                onClick={() => {
                  setPageId("account");
                }}
              >
                Conta
              </div>
              <div
                className={classNames(
                  "font-normal cursor-pointer text-black",
                  pageId === "security" ? "opacity-100" : "opacity-60",
                )}
                onClick={() => {
                  setPageId("security");
                }}
              >
                Segurança
              </div>
              <div
                className={classNames(
                  "font-normal cursor-pointer text-black",
                  pageId === "security" ? "opacity-100" : "opacity-60",
                )}
                onClick={() => {
                  setPageId("signature");
                }}
              >
                Assinatura
              </div>
            </div>
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl h-full mx-auto pt-8 sm:pt-26 pb-12 lg:pb-12">
        <TabComponent />
      </div>
    </div>
  );
};

export default MyAccountPage;
