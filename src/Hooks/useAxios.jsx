import axios from "axios";
import React from "react";

const axiosIntence = axios.create({
  baseURL: "https://a12-server-rho.vercel.app",
});

const useAxios = () => {
  return axiosIntence;
};

export default useAxios;
