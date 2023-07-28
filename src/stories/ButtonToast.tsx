"use client";

import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TostifyType, UseToastify } from "../hooks/useToastify";

interface ButtonProps {
  label: string;
  type: TostifyType;
}

const ButtonToast: React.FC<ButtonProps> = ({ label, type }) => {
  return (
    <div>
      <button className='p-4 w-12 bg-slate-400' onClick={() => UseToastify({ label, type })}>Notify!</button>
      <ToastContainer />
    </div>
  );
};
export default ButtonToast;
