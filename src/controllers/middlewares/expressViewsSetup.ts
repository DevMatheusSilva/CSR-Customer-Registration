import express from "express";
import path from "path";

const viewConfig = (app: express.Application) => {
  app.set("views", path.join(__dirname, "../../../src/views"));
  app.set("view engine", "ejs");
};

export default viewConfig;
