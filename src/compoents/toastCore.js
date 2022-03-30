import React from "react";
import { Flip, toast, ToastContainer } from "react-toastify";

export default function ToastifyBody() {
  return <ToastContainer transition={Flip} />;
}
export const toastError = (msg, position = "bottom-right") => {
  toast.error(msg, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });
};

export const toastWarning = (msg, position = "bottom-right") => {
  toast.warning(msg, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });
};

export const toastSuccess = (msg, position = "bottom-right") => {
  toast.success(msg, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });
};
export const toastInfo = (msg, position = "bottom-right") => {
  toast.info(msg, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });
};
