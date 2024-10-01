import express from "express";
import path from "path";

const expressStaticSetUp = express.static(path.join(__dirname, "../../../public"));

export default expressStaticSetUp;
