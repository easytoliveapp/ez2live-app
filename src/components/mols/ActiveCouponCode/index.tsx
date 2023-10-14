"use client";

import React, { useEffect } from "react";
import {
  ButtonSecondary,
  ButtonThird,
  CouponLoading,
  FormItem,
  Input,
} from "@/components/atoms";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import Image from "next/image";
import { showToastify } from "@/hooks/showToastify";
import CouponsService from "@/service/coupons.service";
import cx from "classnames";

export interface IActiveCouponCodeProps {
  code?: string;
  onCancelClick?: () => void;
}

const ActiveCouponValidationScheema = Yup.object().shape({
  couponCode: Yup.string().required("Código de validação obrigatório"),
});

const ActiveCouponCode: React.FC<IActiveCouponCodeProps> = ({
  code,
  onCancelClick,
}) => {
  const [couponInfo, setCouponInfo] = React.useState<any>();
  const [couponValidationLoading, setCouponValidationLoading] =
    React.useState(false);
  const [couponValidationError, setCouponValidationError] =
    React.useState<boolean>(false);
  const [couponIsValidation, setCouponIsValidation] = React.useState(false);
  const [couponInfoLoading, setCouponInfoLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const getCouponCodeByCode = async (code: string) => {
    const codeActive = await CouponsService.getCouponCodesByCode(code);

    if (codeActive) {
      return codeActive;
    }

    return showToastify({
      type: "error",
      label: "Código inválido",
    });
  };

  const validateCouponCode = async (code: string) => {
    return await CouponsService.activeCouponCode(code);
  };

  const resetComponentState = () => {
    setCouponInfo("");
    setCouponValidationLoading(false);
    setCouponValidationError(false);
    setCouponIsValidation(false);
    setCouponInfoLoading(false);
    setLoading(false);
  };

  const handleClickButton = async (values: { couponCode: string }) => {
    const { couponCode } = values;
    setLoading(true);

    if (couponInfo) {
      setCouponIsValidation(true);
      setCouponValidationLoading(true);
      await validateCouponCode(couponCode)
        .then((res: any) => {
          console.log(res?.data?.coupon);
          setCouponInfo(res?.data?.coupon);
        })
        .catch(() => {
          setCouponIsValidation(false);
          setCouponValidationError(true);
          showToastify({
            type: "error",
            label: "Código inválido",
          });
        })
        .finally(() => {
          setCouponValidationLoading(false);
          setLoading(false);
        });
      return;
    }

    if (!couponInfo) {
      setCouponInfoLoading(true);
      await getCouponCodeByCode(couponCode)
        .then((res: any) => {
          setCouponInfo(res?.data?.coupon);
          setCouponValidationError(false);
        })
        .catch(() => {
          setCouponValidationError(true);
          showToastify({
            type: "error",
            label: "Código inválido",
          });
        })
        .finally(() => {
          setLoading(false);
          setCouponInfoLoading(false);
        });
      return;
    }
  };

  useEffect(() => {
    if (code) {
      setCouponInfoLoading(true);
      CouponsService.getCouponCodesByCode(code)
        .then((res: any) => {
          setCouponInfo(res?.data?.coupon);
        })
        .catch(() => {
          showToastify({
            type: "error",
            label: "Código inválido",
          });
        })
        .finally(() => {
          setCouponInfoLoading(false);
        });
    }
  }, [code]);

  return (
    <div className="w-full h-full">
      {couponIsValidation && (
        <>
          <CouponLoading
            backGround={couponValidationLoading ? "primary" : "secondary"}
            couponColor={couponValidationLoading ? "secondary" : "primary"}
            couponAnimation={couponValidationLoading}
            containerClassnames="bg-transparent"
            title={
              couponValidationLoading
                ? "Validando cupom de desconto..."
                : "Cupom validado!"
            }
            subTitle={
              couponValidationLoading
                ? "esse processo pode levar alguns segundos!"
                : ""
            }
          />

          {!couponValidationLoading && (
            <div className="flex flex-col justify-center items-center">
              <ButtonSecondary
                onClick={() => resetComponentState()}
                className="w-full mt-4"
                disabled={loading}
                loading={loading}
              >
                Validar outro cupom
              </ButtonSecondary>
            </div>
          )}
        </>
      )}

      {!couponIsValidation && (
        <>
          <div className="mb-6 mt-4 flex justify-between">
            <h2 className="pl-2 flex items-center text-3xl leading-[115%] md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
              Ativar <br />
              cupom
            </h2>
            <div className="pr-2">
              <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter">
                <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter"></div>
              </div>
            </div>
          </div>

          <Formik
            validateOnBlur={false}
            initialValues={{
              couponCode: code ?? "",
            }}
            validationSchema={ActiveCouponValidationScheema}
            onSubmit={(values) => handleClickButton(values)}
          >
            {({ errors, touched, isValidating, handleSubmit }) => (
              <>
                <Form className="flex flex-col gap-3">
                  <FormItem
                    label="código de validação"
                    errorMessage={errors.couponCode}
                    invalid={!!(errors.couponCode && touched.couponCode)}
                  >
                    {!!isValidating && <ErrorMessage name="couponCode" />}
                    <Field
                      invalid={!!(errors.couponCode && touched.couponCode)}
                      name="couponCode"
                      type="text"
                      label="couponCode"
                      component={Input}
                      className={cx("bg-white", {
                        "border-generic-alertRed": couponValidationError,
                      })}
                      placeholder="Digite o código"
                    />
                  </FormItem>
                </Form>
                {/* TODO: Transformar snipet abaixo em componente */}
                {couponInfo &&
                  !couponInfoLoading &&
                  !couponValidationLoading && (
                    <>
                      <div>
                        <div className="flex items-center justify-between gap-3 py-3">
                          <hr className="border-neutral-100 rounded-full border-[1px] w-full"></hr>
                          <p
                            className={cx(
                              "flex items-center justify-center w-full font-semibold text-xl min-w-[200px]",
                              {
                                "text-generic-alertRed": couponValidationError,
                                "text-generic-alertGreen":
                                  !couponValidationError,
                              },
                            )}
                          >
                            {!couponValidationError
                              ? "Cupom ativo"
                              : "Cupom inválido"}
                          </p>
                          <hr className="border-neutral-100 rounded-full border-[1px] w-full"></hr>
                        </div>

                        <div className="flex flex-col h-auto">
                          <div className="flex items-center">
                            <Image
                              className="w-16 h-16 rounded-full"
                              src={LogoImage}
                              alt="supplier-logo"
                            />
                            <div className="m-4 px-1">
                              <p className=" font-semibold">estabelecimento</p>
                              <p className=" text-lg">
                                {couponInfo?.coupon?.supplier?.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 m-3">
                            <div className="flex flex-col gap-3">
                              <div>
                                <p className="font-semibold">categoria</p>
                                <p>
                                  {
                                    couponInfo?.coupon?.supplier?.supplierInfo
                                      ?.supplierCategory.title
                                  }
                                </p>
                              </div>
                              <div>
                                <p className="font-semibold">validade</p>
                                <p>{couponInfo?.coupon?.expirationUseDate}</p>
                              </div>
                              <div>
                                <p className="font-semibold">usuário</p>
                                <p>{couponInfo?.user}</p>
                              </div>
                              <div>
                                <p className="font-semibold">cupom</p>
                                <p>{couponInfo?.coupon?.title}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                {couponInfoLoading && !couponInfo && (
                  <div className="flex flex-col justify-center items-center min-h-[300px] gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-4 border-primary-main"></div>
                    <p className="text-lg font-semibold">Carregando...</p>
                  </div>
                )}
                <div className="flex flex-col justify-center items-center">
                  {!couponInfo && (
                    <ButtonSecondary
                      onClick={handleSubmit}
                      className="w-full mt-4"
                      disabled={loading}
                      loading={loading}
                    >
                      Carregar código
                    </ButtonSecondary>
                  )}

                  {couponInfo && (
                    <ButtonSecondary
                      onClick={handleSubmit}
                      className="w-full mt-4"
                      disabled={loading}
                      loading={loading}
                    >
                      Validar cupom
                    </ButtonSecondary>
                  )}

                  <ButtonThird
                    className="text-generic-alertRed"
                    onClick={onCancelClick}
                  >
                    cancelar
                  </ButtonThird>
                </div>
              </>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default ActiveCouponCode;
