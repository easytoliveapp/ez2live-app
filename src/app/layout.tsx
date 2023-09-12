import React from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from "@/providers/ToastProvider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className=" bg-primary-ez2livebg text-base  text-black ">
        <ToastProvider>
          <SiteHeader />
          {children}
          <CommonClient />
        </ToastProvider>
      </body>
    </html>
  );
}
