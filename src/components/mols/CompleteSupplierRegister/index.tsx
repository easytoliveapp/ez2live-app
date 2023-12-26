"use client";

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { ISupplierCompleteRegister } from "@/types/supplier";
import {
  ItemTypeImage,
  TextArea,
  ButtonPrimary,
  FormItem,
  Modal,
} from "@/components";
import supplierService from "@/service/supplier.service";
import { useSession } from "next-auth/react";
import { showToastify } from "@/hooks/showToastify";

const CompleteSupplierRegister: React.FC = () => {
  const { data: session, update } = useSession();
  const [loading, setloading] = useState(false);
  const [logoPlaceHolder, setLogoPlaceHolder] = useState("...carregar");
  const [ilustrationImagePlaceHolder, SetIlustrationImagePlaceHolder] =
    useState("...carregar");

  const CompleteSupplierRegisterSchema = Yup.object().shape({
    supplierLogo: Yup.mixed()
      .nullable()
      .required("Insira uma logo para seu estabelecimento")
      .test(
        "FILE_SIZE",
        "Arquivo muito grande! Selecione um de menor tramanho",
        (value: any) => !value || (value && value.size <= 1024 * 1024),
      )
      .test(
        "FILE_FORMAT",
        "Arquivo com formato não suportado",
        (value: any) =>
          !value || (value && ["image/png", "image/jpeg"].includes(value.type)),
      ),
    supplierBanner: Yup.mixed()
      .nullable()
      .required("Insira uma logo para seu estabelecimento")
      .test(
        "FILE_SIZE",
        "Arquivo muito grande! Selecione um de menor tamanho",
        (value: any) => !value || (value && value.size <= 1024 * 200),
      )
      .test(
        "FILE_SIZE",
        "Arquivo muito pequeno! Selecione um de maior tamanho",
        (value: any) => !value || (value && value.size <= 1024 * 1024),
      )
      .test(
        "FILE_FORMAT",
        "Arquivo com formato não suportado",
        (value: any) =>
          !value || (value && ["image/png", "image/jpeg"].includes(value.type)),
      ),
    description: Yup.string().required(
      "escolha uma descrição para seu estabelecimento",
    ),
  });

  const handleFormSubmit = async (values: ISupplierCompleteRegister) => {
    setloading(true);

    if (!session?.user) {
      return showToastify({
        type: "error",
        label: "Você precisa estar logado para completar o cadastro",
      });
    }

    let newSupplierInfo = {}

    const uploadedImages: any = await supplierService
      .updateSupplierImages(session?.user.id, {
        supplierLogo: values.supplierLogo,
        supplierBanner: values.supplierBanner,
        description: values.description,
      })
      .then((response) => response.data)
      .catch(() => {
        showToastify({
          type: "error",
          label:
            "Tivemos um problema ao atualizar as imagens do estabelecimento",
        });
      })
      .finally(() => {
        setloading(false);
      });

    if (uploadedImages) {

      newSupplierInfo = {
        supplierBanner: uploadedImages?.supplier?.supplierInfo.supplierBanner,
        supplierLogo: uploadedImages?.supplier?.supplierInfo.supplierLogo,
      }

      await supplierService
        .updateSupplierById(session?.user.id, {
          supplierInfo: {
            supplierDescription: values.description,
          },
        })
        .then((res: any) => {
          newSupplierInfo = {
            ...newSupplierInfo,
            supplierDescription: res.data.supplier.supplierInfo.supplierDescription,
          };

          showToastify({
            type: "success",
            label: "Cadastro completo com sucesso",
          });
        })
        .catch(() => {
          showToastify({
            type: "error",
            label: "Tivemos um problema ao completar seu cadastro",
          });
        })
        .finally(() => {
          setloading(false);
        });
    }

    update({
      ...session,
      user: {
        ...session?.user,
        supplierInfo: {
          ...session?.user.supplierInfo,
          ...newSupplierInfo,
        },
      },
    }).then(() => {
      console.log("update");
    });

    return uploadedImages;
  };

  return (
    <Modal
      contentExtraClass="max-w-lg"
      closeOnBlur={false}
      hasCloseButton={false}
      show={!!(session?.user && session.user.isSupplier)}
      onCloseModal={() => null}
    >
      <div>
        <div className="mt-8 mb-16 w-full gap-4 flex items-center justify-between">
          <h2 className=" pl-6 flex items-center text-lg leading-[115%] md:text-3xl md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
            Completar <br /> cadastro
          </h2>
          <div>
            <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter">
              <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter"></div>
            </div>
          </div>
        </div>

        <Formik
          initialValues={{
            supplierLogo: "",
            supplierBanner: "",
            description: "",
          }}
          validationSchema={CompleteSupplierRegisterSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <FormItem
                label="Logo"
                errorMessage={errors.supplierLogo}
                invalid={!!(errors.supplierLogo && touched.supplierLogo)}
              >
                <label
                  onChange={() => setLogoPlaceHolder("carregado")}
                  htmlFor="supplierLogo"
                  className="flex justify-between cursor-pointer focus:border-primary-main items-center w-full border-black border-[1px] rounded-3xl h-11 px-4 py-3 text-sm font-medium"
                >
                  <p>{logoPlaceHolder}</p>
                  <span>
                    <ItemTypeImage className="w-8 h-8 bg-white" />
                  </span>
                  <input
                    className="hidden"
                    id="supplierLogo"
                    type="file"
                    onChange={(event: any) =>
                      setFieldValue("supplierLogo", event.target.files[0])
                    }
                  />
                </label>
              </FormItem>

              <FormItem
                label="Imagem ilustrativa"
                errorMessage={errors.supplierBanner}
                invalid={!!(errors.supplierBanner && touched.supplierBanner)}
              >
                <label
                  onChange={() => SetIlustrationImagePlaceHolder("carregado")}
                  htmlFor="supplierBanner"
                  className="flex justify-between cursor-pointer focus:border-primary-main items-center w-full border-black border-[1px] rounded-3xl h-11 px-4 py-3 text-sm font-medium"
                >
                  <p>{ilustrationImagePlaceHolder}</p>
                  <span>
                    <ItemTypeImage className="w-8 h-8 bg-white" />
                  </span>
                  <input
                    className="hidden"
                    id="supplierBanner"
                    type="file"
                    onChange={(event: any) =>
                      setFieldValue("supplierBanner", event.target.files[0])
                    }
                  />
                </label>
              </FormItem>

              <FormItem
                label="descrição"
                errorMessage={errors.description}
                invalid={!!(errors.description && touched.description)}
              >
                <Field
                  name="description"
                  label="description"
                  component={TextArea}
                  className="h-32 bg-white text-black"
                  placeholder="escrever descrição do estabelecimento"
                />
              </FormItem>

              <ButtonPrimary
                type="submit"
                className="w-full mt-6"
                disabled={loading}
                loading={loading}
              >
                Completar cadastro
              </ButtonPrimary>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default CompleteSupplierRegister;
