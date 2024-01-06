import React from "react";

interface ISkeletonCategoriesCard {
  numberofCategories: number;
}

const SkeletonCategoriesCards: React.FC<ISkeletonCategoriesCard> = ({
  numberofCategories,
}) => {
  const SkeletonCategorieCard = () => {
    return (
      <div
        className={
          "bg-white border-2 focus:border-secondary-main active:shadow-sm rounded-lg p-1 py-2 w-20 min-w-[80px] flex flex-col border-transparent gap-4 space-around w-full items-center cursor-pointer"
        }
      >
        <div className="w-1/4 h-auto">
          <svg
            className="text-gray-200 rounded-full dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
      </div>
    );
  };

  const categories: any = [];
  for (let i = 0; i < numberofCategories; i++) {
    categories.push(<SkeletonCategorieCard key={i}></SkeletonCategorieCard>);
  }

  return (
    <div className="flex overflow-x-auto justify-start my-4 w-full gap-2">
      {categories}
    </div>
  );
};

export default SkeletonCategoriesCards;
