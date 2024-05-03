"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Checked from "@/images/easytolive/icons/checked-success.svg";
import { ButtonPrimary, ButtonThird } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import authService from "@/service/auth.service";
import { showToastify } from "@/hooks/showToastify";

const SupplierRegistered = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const userId = params.get("id");
  async function sendVerificationEmail() {
    const currentDate = new Date();
    const emailSentDate = localStorage.getItem("VERIFICATION_EMAIL_SENT");
    setLoading(true);

    if (!userId) {
      showToastify({ label: "Id de usuário não disponível", type: "error" });
      setLoading(false);
      return;
    }

    if (emailSentDate !== null) {
      const storedDate = new Date(emailSentDate);
      storedDate.setMinutes(storedDate.getMinutes() + 5); // Adiciona 5 minutos ao horário armazenado
      setTimeout(() => setEmailSent(false), 5 * 60 * 1000);
      if (currentDate < storedDate) {
        setEmailSent(true);
        setLoading(false);
        return;
      }
      setEmailSent(false);
    }

    try {
      await resendVerificationEmail(userId);
      localStorage.setItem("VERIFICATION_EMAIL_SENT", currentDate.toString());
      setLoading(false);
      setEmailSent(true);
    } catch (error) {
      handleVerificationEmailError();
      setLoading(false);
      setEmailSent(false);
    }
  }

  async function resendVerificationEmail(userId: string) {
    await authService.resendEmailVerification(userId);
  }

  function handleVerificationEmailError() {
    showToastify({
      label: "Ocorreu um erro ao reenviar email de verificação",
      type: "error",
    });
  }

  const { data: session } = useSession();
  const isSupplier = params.get("isSupplier") === "1";

  useEffect(() => {
    if (session?.user.isVerified === true) {
      router.push(isSupplier ? "/app/dashboard" : "/app");
    }
  }, []);

  // by url query param
  const message = isSupplier
    ? "Agora pode relaxar e ficar tranquilo! Em breve entraremos em contato"
    : "Cadastro criado com sucesso! Verifique seu e-mail para acessar sua conta.";

  const title = isSupplier
    ? "Cadastro Enviado 🚀"
    : "Bem-vindo a EasyToLive 🚀";
  return (
    <div className="flex flex-col items-center justify-between pt-24 gap-8">
      <span></span>
      <Image alt="Ez-2-live-logo" src={Checked} className="w-auto h-14" />
      <div className="flex flex-col gap-1 w-full justify-center items-center">
        <h2 className="pt-2 text-lg font-semibold">{title}</h2>
        <p className="p-4 max-w-xl text-center">{message}</p>
      </div>
      <ButtonPrimary
        onClick={() => {
          router.push("/");
        }}
      >
        Visite nosso site
      </ButtonPrimary>
      {!isSupplier && (
        <div className="flex flex-col items-center">
          <p className="mb-0 mt-24 p-0">Não recebeu nenhum email?</p>
          <ButtonThird
            onClick={() => sendVerificationEmail()}
            disabled={loading || emailSent}
            className="sm:py-2 sm:my-0 sm:text-xs text-primary-main"
          >
            {emailSent ? "E-mail enviado ✓" : "Enviar e-mail de confirmação"}
          </ButtonThird>
        </div>
      )}
    </div>
  );
};

export default SupplierRegistered;
