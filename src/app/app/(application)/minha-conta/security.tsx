import React, { useState } from "react";
import { showToastify } from "@/hooks/showToastify";
import { type IDeleteUSer } from "@/types/user";
import authService from "@/service/auth.service";
import usersService from "@/service/users.service";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonThird,
  FormItem,
  Input,
  Modal,
} from "@/components";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface SecurityProps {
  session: Session | null;
}

export const Security: React.FC<SecurityProps> = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const [isDeleteAccountOpened, setIsDeleteAccountOpened] = useState(false);
  const [emailSendButton, setEmailSendButton] = useState("Trocar senha");
  const [isSendEmailDisabled, setIsSendEmailDisabled] = useState(false);

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
    setIsDeleteAccountOpened(false);
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
          setIsSendEmailDisabled(true);
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
        show={isDeleteAccountOpened}
        onCloseModal={() => {
          setIsDeleteAccountOpened(false);
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
                  label="Senha"
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
                    setIsDeleteAccountOpened(false);
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
        onClick={handleSendEmailChangePassword}
        loading={loading}
        disabled={isSendEmailDisabled}
        className="mt-4"
      >
        {emailSendButton}
      </ButtonSecondary>
      <ButtonThird
        onClick={() => {
          setIsDeleteAccountOpened(true);
        }}
      >
        Excluir conta
      </ButtonThird>
    </div>
  );
};
