import React from 'react'
import Image from "next/image";
import WidthIcon from "@/images/easytolive/icons/largura-48.svg";
import HeigthIcon from "@/images/easytolive/icons/altura-48.svg";

export interface IImageSizeWarning {
  recommendedWidth: number,
  recommendedHeight: number,
}

function ImageSizeWarning({
  recommendedWidth,
  recommendedHeight
}: IImageSizeWarning) {
  return (
    <div className="p-4 bg-[#6722ff0d] rounded-lg">
      <div>
        <p className="font-bold text-sm text-primary-main pb-2">
          Tamanho recomendado:{" "}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex gap-2 items-center w-1/2">
          <Image
            src={WidthIcon}
            width={24}
            height={24}
            alt={"width icon"}
          />
          <p className="text-primary-main">{recommendedWidth} px</p>
        </div>
        <div className="flex gap-2 items-center w-1/2">
          <Image
            src={HeigthIcon}
            width={24}
            height={24}
            alt={"heigth icon"}
          />
          <p className="text-primary-main">{recommendedHeight} px</p>
        </div>
      </div>
    </div>
  )
}

export default ImageSizeWarning