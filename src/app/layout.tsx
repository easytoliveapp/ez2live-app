import React from "react";
import { Kanit } from "next/font/google";
import { getServerSession } from "next-auth";

import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AuthProvider from "@/providers/SessionProvider";
import { SupplierProvider } from "@/providers/SuppliersProvider";
import { PaymentInvoiceProvider } from "@/providers/paymentInvoice";
import ToastProvider from "@/providers/ToastProvider";

import { authOptions } from "./api/auth/[...nextauth]/route";
import CommonClient from "./CommonClient";
import { CompleteSupplierRegisterProvider } from "@/components/mols/CompleteSupplierRegister/Context";

const kanit = Kanit({
  subsets: ["latin"],
  display: "auto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={kanit.className}>
      <head>
        <title>EasyToLive</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-generic-background text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ToastProvider>
          <AuthProvider session={session}>
            <SupplierProvider>
              <PaymentInvoiceProvider>
                <CompleteSupplierRegisterProvider>
                  {children}
                </CompleteSupplierRegisterProvider>
              </PaymentInvoiceProvider>
            </SupplierProvider>
            <CommonClient />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
