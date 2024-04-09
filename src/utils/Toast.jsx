import {ToastContainer, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

export const Toast = () => {
  return (
    <ToastContainer
      toastClassName='toast'
      autoClose={5000}
      icon={false}
      closeOnClick={true}
      draggable
      position={"bottom-left"}
      theme={"light"}
      transition={Slide}
      limit={4}
    />
  )
}
