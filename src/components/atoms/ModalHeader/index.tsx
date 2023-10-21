import React from "react";

interface IModalHeaderProps {
  label: string;
  color?: "main" | "secondary";
}

const ModalHeader: React.FC<IModalHeaderProps> = ({
  label,
  color = "secondary",
}) => {
  return (
    <div className="mb-6 mt-4 flex justify-between">
      <h2 className="pl-2 flex items-center text-3xl leading-[115%] md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
        {label}
      </h2>
      <div className="pr-2">
        <div
          className={`relative rounded-full w-40 h-16 bg-gradient-to-r ${
            color === "secondary"
              ? "from-secondary-main to-secondary-lighter"
              : "from-primary-main to-primary-lighter"
          }`}
        >
          <div
            className={`absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r ${
              color === "secondary"
                ? "from-secondary-main to-secondary-lighter"
                : "from-primary-main to-primary-lighter"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
