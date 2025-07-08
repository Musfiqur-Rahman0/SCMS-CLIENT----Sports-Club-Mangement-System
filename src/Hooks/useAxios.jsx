import axios from "axios";
import React from "react";

const axiosIntence = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  return axiosIntence;
};

export default useAxios;
