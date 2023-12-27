"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import CheckIcon from "@/images/easytolive/icons/checkIcon.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import DashboardIcon from "@/images/easytolive/icons/DashboardIcon.svg";
import ShopPageIcon from "@/images/easytolive/icons/shopMainColor.svg";
import CalendarCheckIcon from "@/images/easytolive/icons/CalendarCheck.svg";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";

import classNames from "@/utils/classNames";

const PageDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();

  return (
    <div className="nc-PageHome relative overflow-hidden flex flex-row w-full gap-3 p-5">
      <div className="md:flex flex-col w-[300px]">
        <div className="flex flex-col w-full gap-5 rounded-lg bg-[#e7eaf133] px-2">
          <div className="flex flex-col w-full h-24 gap-5 relative">
            <div
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
                filter: "contrast(0.5) blur(1px)",
              }}
            />
            <div className="absolute left-0 top-0 h-full flex items-center justify-center">
              <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row w-full h-full gap-1 justify-center items-center ml-2">
                  <div className="rounded-full bg-gray-200">
                    <Image
                      src={LogoImage}
                      alt="logo"
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                    {/* {session?.user?.supplierInfo?.supplierLogo && (
                      <Image
                        src={session?.user?.supplierInfo?.supplierLogo}
                        alt="logo"
                        className="rounded-full"
                        width={50}
                        height={50}
                      />
                    )} */}
                  </div>
                  <div className="flex flex-col">
                    {session?.user?.name && (
                      <p className="text-lg font-semibold text-white">
                        {session?.user?.name}
                      </p>
                    )}
                    {session?.user?.email && (
                      <p className="text-xs text-white">
                        {session?.user?.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* validate coupon */}
          <div className="">
            <div className="w-full flex flex-col relative mb-2 justify-center gap-2">
              {[
                {
                  href: "/dashboard",
                  label: "Dashboard",
                  icon: DashboardIcon,
                },
                {
                  href: "/dashboard/parceiro/ativar-cupom",
                  label: "Ativar cupom",
                  icon: CheckIcon,
                },
                {
                  href: "/dashboard/parceiro/perfil",
                  label: "Criar novo cupom",
                  icon: CouponPrimary,
                },
                {
                  href: "/dashboard/parceiro/perfil",
                  label: "Meu perfil",
                  icon: ShopPageIcon,
                },
              ].map(({ href, label, icon }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className={classNames(
                    "w-full py-2 px-3 hover:bg-secondary-main font-semibold flex flex-row gap-3 text-primary-main rounded-md transition",
                    pathname === href ? "bg-secondary-main" : "bg-transparent",
                  )}
                >
                  <Image src={icon} width={20} alt="icon" className="flex" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:w-screen-xl md:max-w-screen-xl w-full px-5">
        <h2 className="text-xl font-semibold mb-7">Dashboard</h2>
        <div className="grid md:grid-cols-4 justify-center gap-20 b9r">
          {/* cards */}
          {[
            {
              icon: CouponPrimary,
              title: "423",
              subtitle: "cupons gerados no total",
            },
            {
              icon: CheckIcon,
              title: "231",
              subtitle: "cupons ativos no total",
            },
            {
              icon: CalendarCheckIcon,
              title: "31",
              subtitle: "cupons ativos em janeiro",
            },
            {
              icon: CouponPrimary,
              title: "39",
              subtitle: "cupons concluídos",
            },
          ].map((card, idx) => (
            <div
              className={classNames(
                "md:w-full p-4 py-3 w-full border-l-8 border-secondary-main bg-[#e7eaf122] rounded-lg shadow-sm flex flex-col",
              )}
              key={idx}
            >
              <div className="rounded-lg bg-[#6722ff0d] p-1 w-fit mb-3">
                <Image src={card.icon} className="w-auto h-6" alt="card icon" />
              </div>
              <h3 className="font-bold text-xl pl-2">{card.title}</h3>
              <p className="text-sm pl-2 text-gray-700">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageDashboard;
