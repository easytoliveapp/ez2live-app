import React from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import CommonClient from "./(app)/CommonClient";
=======
import CommonClient from "./app/CommonClient";
>>>>>>> 5b7cfa46f47cdbe78d6dea0e12e4f5384af5753b
import ToastProvider from "@/providers/ToastProvider";
import AuthProvider from "@/providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import { SupplierProvider } from "@/providers/SuppliersProvider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-generic-background text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ToastProvider>
          <AuthProvider session={session}>
            <SupplierProvider>{children}</SupplierProvider>
            <CommonClient />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
