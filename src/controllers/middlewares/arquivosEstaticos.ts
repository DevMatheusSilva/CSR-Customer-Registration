import express from "express";
import path from "path";

const arquivosEstaticos = express.static(path.join(__dirname, "../../../public"));

export default arquivosEstaticos;
