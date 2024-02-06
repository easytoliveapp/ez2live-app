import { ButtonPrimary, NcImage } from "@/components";
import React from "react";
import I404Png from "@/images/404.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div className="nc-Page404">
        <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
          {/* HEADER */}
          <header className="text-center max-w-2xl mx-auto space-y-2">
            <NcImage src={I404Png} alt="not-found" />
            <span className="block text-sm text-neutral-800 sm:text-base tracking-wider font-medium">
              {`A PÁGINA QUE VOCÊ PROCURA NÃO EXISTE.`}{" "}
            </span>
            <div className="pt-8">
              <ButtonPrimary>
                <Link href={"/app"}>voltar para o início</Link>
              </ButtonPrimary>
            </div>
          </header>
        </div>
      </div>
      ;
    </div>
  );
}
