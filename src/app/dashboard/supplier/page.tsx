import { ButtonSecondary } from "@/components";
import React from "react";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

function PageDashboard() {
  return (
    <div className="nc-PageHome relative overflow-hidden flex flex-col justify-center items-center w-full gap-3 p-5">
      <div className="md:w-screen-xl md:max-w-screen-xl sm:mx-auto mx-2 w-full">
        {/* validate coupon */}
        <div className="mb-10">
          <div className="h-10 w-full relative mb-2">
            <div className="absolute right-0 top-0">
              <ButtonSecondary>Ativar cupom</ButtonSecondary>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 justify-center gap-20">
          {/* cards */}
          {[
            {
              backgroundColor: "bg-lime-200",
              title: "Cupons Gerados",
              subtitle: "252 na última semana",
            },
            {
              backgroundColor: "bg-sky-200",
              title: "Cupons Ativados",
              subtitle: "129 na última semana",
            },
            {
              backgroundColor: "bg-red-200",
              title: "Faturamento Mês",
              subtitle: "R$ 125,00 em Maio",
            },
          ].map((card, idx) => (
            <div
              className={`${card.backgroundColor} md:w-full p-5 p-x-7 rounded-md w-full`}
              key={idx}
            >
              <h3 className="font-bold text-lg">
                <ArchiveBoxIcon className="w-5 h-5" />
                {card.title}
              </h3>
              <p className="text-md font-weight">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageDashboard;
