"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Input,
  ButtonSecondary,
  FormItem,
  ToggleButton,
  ButtonThird,
  CouponLoading,
} from "@/components/atoms";
import * as Yup from "yup";
import { ICreateCoupon, IGetCouponInfo } from "@/types/coupons";
import couponService from "@/service/coupons.service";
import { showToastify } from "@/hooks/showToastify";
import { Modal } from "@/components";
import couponsService from "@/service/coupons.service";

interface ICreateOrUpdateCoupon {
  IsUpdate?: boolean;
  couponId?: string;
}

const CreateOrUpdateCoupon: React.FC<ICreateOrUpdateCoupon> = ({
  IsUpdate,
  couponId,
}) => {
  const [loading, setLoading] = useState(false);
  const [couponsUnlimited, setCouponsUnlimited] = useState(true);
  const [unlimitedByUser, setUnlimitedByUser] = useState(true);
  const [coupon, setCoupon] = useState<IGetCouponInfo>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [initalValues, setInitialValues] = useState({
    title: "",
    discount: "20",
    maxTotal: 0,
    maxPerUser: 0,
    expirationGenerationDate: new Date("2022-01-01"),
    expirationUseDate: new Date("2022-01-01"),
  });
  const handleDeleteModal = async () => {
    if (couponId) {
      return await couponsService
        .deleteCoupon(couponId)
        .then(() =>
          showToastify({
            label: "cupom deletado com sucesso",
            type: "success",
          }),
        )
        .catch((error) => {
          if (error?.response?.data?.code === 204) {
            showToastify({
              label:
                "Ocorreu um erro ao deletar cupom. Tente novamente em instantes.",
              type: "error",
            });
          }
        })
        .finally(() =>
          setTimeout(() => {
            window.location.reload();
          }, 2000),
        );
    }
  };

  useEffect(() => {
    if (IsUpdate && couponId) {
      couponService
        .getCouponById(couponId)
        .then((res: any) => setCoupon(res.data.coupon))
        .catch((error) =>
          showToastify({
            label: `ocorreu um erro ao carregar dados do cupom: ${error}`,
            type: "error",
          }),
        )
        .finally();
    }
  }, [IsUpdate, couponId]);

  useEffect(() => {
    if (!!coupon) {
      if (Number(coupon?.maxPerUser) === -1) {
        setUnlimitedByUser(true);
      } else {
        setUnlimitedByUser(false);
      }
      if (Number(coupon?.maxTotal) === -1) {
        setCouponsUnlimited(true);
      } else {
        setCouponsUnlimited(false);
      }
      setInitialValues({
        title: coupon.title,
        discount: coupon.discount,
        maxPerUser: 0,
        maxTotal: 0,
        expirationGenerationDate: new Date(coupon.expirationGenerationDate),
        expirationUseDate: new Date(coupon.expirationUseDate),
      });
    }
  }, [coupon]);

  const CreateCouponValidationSchema = Yup.object().shape({
    title: Yup.string().required("Título requerido."),
    discount: Yup.string().required("Selecione um desconto de 5% até 100%."),
    maxTotal: Yup.string().required(
      "Limite de cupons que podem ser utilizados.",
    ),
    maxPerUser: Yup.string().required("Limite de cupons por usuário."),
    expirationGenerationDate: Yup.date()
      .required("Data de validade para geração do cupom.")
      .min(new Date(), "Selecione uma data maior que a atual"),
    expirationUseDate: Yup.date()
      .required("Data limite para utilização do cupom.")
      .min(new Date(), "Selecione uma data maior que a atual"),
  });

  const couponSuccessRedirect = () => {
    showToastify({
      label: `cupom${IsUpdate ? " atualizado " : " gerado "}com sucesso`,
      type: "success",
    });
    setTimeout(() => {
      setLoading(false);
      window.location.reload();
    }, 2000);
  };

  const handleFormSubmit = async (values: ICreateCoupon) => {
    setLoading(true);

    const createData = {
      title: values.title,
      discount: String(values.discount),
      maxPerUser: unlimitedByUser ? -1 : Number(values.maxPerUser),
      maxTotal: couponsUnlimited ? -1 : Number(values.maxTotal),
      expirationGenerationDate: new Date(values.expirationGenerationDate),
      expirationUseDate: new Date(values.expirationUseDate),
    };
    const updateData = {
      title: values.title,
      discount: String(values.discount),
      maxPerUser: unlimitedByUser ? -1 : Number(values.maxPerUser),
      maxTotal: couponsUnlimited ? -1 : Number(values.maxTotal),
    };

    if (IsUpdate && couponId) {
      await couponService
        .updateCoupon(updateData, couponId)
        .then(() => couponSuccessRedirect())
        .catch((error) => {
          showToastify({
            label: `ocorreu um erro ao atualizar cupom: ${error}`,
            type: "error",
          });
        })
        .finally(() => setLoading(false));
    } else {
      await couponService
        .createCoupon(createData)
        .then(() => couponSuccessRedirect())
        .catch((error) => {
          if (error?.response?.data?.code === 400) {
            showToastify({
              label:
                "Ocorreu um erro ao criar cupom. Por favor verificar os campos.",
              type: "error",
            });
          }
          if (error?.response?.data?.code === 401) {
            showToastify({
              label: "Você não tem permisão para criar cupom.",
              type: "error",
            });
          }
        })
        .finally(() => setLoading(false));
    }

    return values;
  };

  return (
    <div className="w-full">
      <Modal show={deleteModal} onCloseModal={() => setDeleteModal(false)}>
        <div className="w-full flex flex-col">
          <h2 className="font-bold text-xl w-full text-center pb-1 text-black">
            DELETAR CUPOM
          </h2>
          <p className="p-1 text-center">
            Deseja deletar permanentemente o cupom?
          </p>
          <div className="w-full m-auto">
            <ButtonThird
              className="w-full cursor-pointer"
              onClick={() => handleDeleteModal()}
            >
              deletar cupom
            </ButtonThird>
          </div>
          <p className="text-xs p-2 text-center">
            Obs: Os cupons gerados pelos usuários ainda podem usar pelos mesmos
            enquanto ainda estiverem na validade.
          </p>
        </div>
      </Modal>
      {IsUpdate && !coupon ? (
        <CouponLoading
          title={"carregando dados do cupom"}
          couponColor={"primary"}
          backGround={"secondary"}
        />
      ) : (
        <div>
          <div className="mb-6 mt-4 flex justify-between">
            <h2 className="pl-2 flex items-center text-3xl leading-[115%] md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
              {IsUpdate ? "Atualizar Cupom" : "Novo Coupon"}
            </h2>
            <div className="pr-2">
              <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter">
                <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter"></div>
              </div>
            </div>
          </div>
          <Formik
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={initalValues}
            validationSchema={CreateCouponValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, errors, touched, isValidating, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <FormItem
                  className="w-32 !text-3xl py-3 flex items-center justify-center font-semibold rounded-full border-[1px] border-black"
                  label={values.discount + "%"}
                  errorMessage={errors.discount}
                  invalid={!!(errors.discount && touched.discount)}
                >
                  <Field
                    invalid={!!(errors.discount && touched.discount)}
                    className="accent-primary-main !focus:border-none !hover:border-none focus:ring-0"
                    name="discount"
                    min="5"
                    max="95"
                    step="1"
                    type="range"
                    label="discount"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Título do cupom"
                  errorMessage={errors.title}
                  invalid={!!(errors.title && touched.title)}
                >
                  {!!isValidating && <ErrorMessage name="title" />}
                  <Field
                    invalid={!!(errors.title && touched.title)}
                    name="title"
                    type="text"
                    label="title"
                    component={Input}
                    className="bg-white"
                  />
                </FormItem>
                <div className="grid grid-cols-2 w-full">
                  <FormItem
                    label="Limite de cupons"
                    errorMessage={!couponsUnlimited && errors.maxTotal}
                    invalid={
                      !couponsUnlimited &&
                      !!(errors.maxTotal && touched.maxTotal)
                    }
                  >
                    <Field
                      disabled={couponsUnlimited}
                      invalid={
                        !couponsUnlimited &&
                        !!(errors.maxTotal && touched.maxTotal)
                      }
                      name="maxTotal"
                      value={couponsUnlimited ? "ilimitado" : values.maxTotal}
                      type="text"
                      label="maxTotal"
                      component={Input}
                      className="bg-white disabled:bg-white"
                    />
                  </FormItem>
                  <FormItem
                    label="Limite por usuário"
                    errorMessage={!unlimitedByUser && errors.maxPerUser}
                    invalid={
                      !unlimitedByUser &&
                      !!(errors.maxPerUser && touched.maxPerUser)
                    }
                  >
                    <Field
                      disabled={unlimitedByUser}
                      invalid={
                        !unlimitedByUser &&
                        !!(errors.maxPerUser && touched.maxPerUser)
                      }
                      name="maxPerUser"
                      value={unlimitedByUser ? "ilimitado" : values.maxPerUser}
                      type="text"
                      label="maxPerUser"
                      component={Input}
                      className="bg-white disabled:bg-white"
                    />
                  </FormItem>
                  <div>
                    <ToggleButton
                      onClick={() => setCouponsUnlimited(!couponsUnlimited)}
                      toggle={couponsUnlimited}
                      label="ilimitado"
                    />
                  </div>
                  <div>
                    <ToggleButton
                      onClick={() => setUnlimitedByUser(!unlimitedByUser)}
                      toggle={unlimitedByUser}
                      label="ilimitado"
                    />
                  </div>
                </div>
                {!IsUpdate && (
                  <>
                    <FormItem
                      label="Cupom ativo até..."
                      errorMessage={errors.expirationGenerationDate}
                      invalid={
                        !!(
                          errors.expirationGenerationDate &&
                          touched.expirationGenerationDate
                        )
                      }
                    >
                      <Field
                        invalid={
                          !!(
                            errors.expirationGenerationDate &&
                            touched.expirationGenerationDate
                          )
                        }
                        name="expirationGenerationDate"
                        type="date"
                        label="expirationGenerationDate"
                        component={Input}
                        className="bg-white cursor-pointer"
                      />
                    </FormItem>
                    <FormItem
                      label="Validade para o uso"
                      errorMessage={errors.expirationUseDate}
                      invalid={
                        !!(
                          errors.expirationUseDate && touched.expirationUseDate
                        )
                      }
                    >
                      <Field
                        invalid={
                          !!(
                            errors.expirationUseDate &&
                            touched.expirationUseDate
                          )
                        }
                        name="expirationUseDate"
                        type="date"
                        label="expirationUseDate"
                        component={Input}
                        className="bg-white cursor-pointer"
                      />
                    </FormItem>
                  </>
                )}
                <ButtonSecondary
                  type="submit"
                  className="w-full mt-20"
                  disabled={loading}
                  loading={loading}
                >
                  Salvar cupom
                </ButtonSecondary>
                <ButtonThird onClick={() => setDeleteModal(true)}>
                  deletar cupom
                </ButtonThird>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default CreateOrUpdateCoupon;
