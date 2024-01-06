import React, { FC, useEffect } from "react";
import backgroundLineSvg from "../images/Moon.svg";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import { ButtonPrimary, CategoryCard } from "@/components";
import Image from "next/image";
import { useSupplierContext } from "@/providers/SuppliersProvider";
import SkeletonCategoriesCards from "@/skeleton/CategoriesCards";
import { ICategorieProps } from "@/components/atoms/CategoryCard";
import imageCategory from "@/images/easytolive/icons/categorie-example.svg";

export interface SectionPromo2Props {
  className?: string;
}

const CONTENT_BY_CATEGORY = {
  Restaurante: {
    title: "Restaurantes",
    description:
      "Descontos especiais em refeições, combos de restaurantes populares, ofertas de delivery e cupons para sobremesas gratuitas.",
  },
  Estética: {
    title: "Procedimentos Estéticos",
    description:
      "Ofertas exclusivas em tratamentos de beleza, massagens, procedimentos de spa, pacotes de cuidados com a pele e descontos em salões de beleza.",
  },
  Nutrição: {
    title: "Nutricionistas",
    description:
      "Consultas nutricionais com descontos especiais, planos personalizados de alimentação saudável, e ofertas em produtos e suplementos nutricionais.",
  },
  Suplementos: {
    title: "Suplementos",
    description:
      "Descontos em suplementos alimentares, vitaminas, shakes de proteína, produtos fitness e acessórios para malhação.",
  },
};

const SectionPromo2: FC<SectionPromo2Props> = ({ className = "lg:pt-10" }) => {
  const { categories } = useSupplierContext();

  const [chosenCategory, setChosenCategory] = React.useState("");

  const handleChooseCategory = (title: string) => setChosenCategory(title);

  useEffect(() => {
    Array.isArray(categories) && setChosenCategory(categories[0]?.title);
  }, [categories]);

  return (
    <div className={`nc-SectionPromo2 ${className}`} id="EasyToLive">
      <div className="relative flex flex-col lg:flex-row bg-[#22222] dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24 gap-24">
        <div className="absolute inset-0">
          <Image
            className="absolute w-full h-full object-contain dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[45%] max-w-lg relative">
          <Image
            src={LogoImage}
            className="w-28 rounded-full"
            alt="Logo Easy"
          />
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.13] tracking-tight">
            A Easy quer
            <br />
            facilitar sua vida
          </h2>
          <span className="block mt-6 text-slate-500 dark:text-slate-400">
            Descubra os melhores descontos: O que você pode encontrar no
            EasyToLive
          </span>
          <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
            <ButtonPrimary
              href="/app/conta/acessar"
              className="dark:bg-slate-200 dark:text-slate-900"
            >
              Procurar descontos
            </ButtonPrimary>
          </div>
        </div>

        <div className="relative mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]">
          {categories && categories.length > 0 ? (
            <div className="flex overflow-x-auto justify-start my-4 w-full gap-2">
              {categories.map((category: ICategorieProps, index: number) => (
                <CategoryCard
                  id={category.id}
                  key={index}
                  name={category.title}
                  onClick={() => handleChooseCategory(category.title)}
                  image={imageCategory}
                  isActive={category.id === chosenCategory}
                />
              ))}
            </div>
          ) : (
            <SkeletonCategoriesCards numberofCategories={4} />
          )}

          <div className="p-5 bg-white rounded-lg text-sm font-normal">
            <h4 className="font-semibold pb-4 text-md">
              {CONTENT_BY_CATEGORY[
                chosenCategory as keyof typeof CONTENT_BY_CATEGORY
              ]?.title ?? ""}
            </h4>
            {/* <p>{CONTENT_BY_CATEGORY[chosenCategory]}</p> */}
            <p>
              {CONTENT_BY_CATEGORY[
                chosenCategory as keyof typeof CONTENT_BY_CATEGORY
              ]?.description ?? ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionPromo2;
