import React from "react";
import SectionHowItWork from "@/components_old/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components_old/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components_old/SectionPromo1";
import SectionHero2 from "@/components_old/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "@/components_old/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components_old/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components_old/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components_old/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components_old/SectionPromo2";
import SectionSliderCategories from "@/components_old/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components_old/SectionPromo3";
import SectionClientSay from "@/components_old/SectionClientSay/SectionClientSay";
import Heading from "@/components_old/Heading/Heading";
import ButtonSecondary from "@/components/atoms/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components_old/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import Button from "@/components/atoms/Button/Button";

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />

      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
        />

        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>
        <SectionPromo1 />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        />

        <SectionPromo2 />

        <SectionSliderLargeProduct cardStyle="style2" />

        <SectionSliderCategories />

        <SectionPromo3 />

        <SectionGridFeatureItems />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div>
        <SectionClientSay />
      </div>
    </div>
  );
}

export default PageHome;