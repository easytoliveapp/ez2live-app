import 'react-toastify/dist/ReactToastify.css';

import type { ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

export type TostifyType = 'success' | 'error' | 'info' | 'warning';

export interface ITostifyProps {
  type?: TostifyType;
  label: string;
  options?: ToastOptions;
}

const defaultOptions: ToastOptions = {
  position: 'top-right',
  theme: 'light',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};


export const UseToastify = ({ type = 'info', label, options }: ITostifyProps) =>
  toast[type](label, {
    ...defaultOptions,
    ...options,
    className: [[type], options?.className].join(' '),
  });