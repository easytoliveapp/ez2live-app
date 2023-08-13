import { ButtonSecondary } from "@/components";
import React from "react";


function PageDashboard() {
  return (
    <div className="nc-PageHome relative overflow-hidden flex flex-col justify-center items-center w-full gap-3 p-5">

      <div className="h-10 w-full relative mb-2">
        <div className="absolute right-0 top-0">
          <ButtonSecondary>Ativar cupom</ButtonSecondary>
        </div>
      </div>


      <div className="md:w-screen-xl md:max-w-screen-xl sm:mx-auto grid gap-3 md:grid-cols-3 mx-2 w-full">
        {/* validate coupon */}

        {/* cards */}
        {[
          {
            backgroundColor: 'bg-lime-200',
            title: 'Cupons Gerados',
            subtitle: '252 na última semana',
          },
          {
            backgroundColor: 'bg-sky-200',
            title: 'Cupons Ativados',
            subtitle: '129 na última semana',
          },
          {
            backgroundColor: 'bg-red-200',
            title: 'Faturamento Mês',
            subtitle: 'R$ 125,00 em Maio',
          }
        ].map((card, idx) => (
          <div className={`${card.backgroundColor} md:w-64 p-5 p-x-7 rounded-md w-full`} key={idx}>
            <h3 className="font-bold text-lg">{card.title}</h3>
            <p className="text-md font-weight">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageDashboard;
