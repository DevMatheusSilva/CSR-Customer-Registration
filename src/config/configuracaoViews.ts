import express from "express";
import path from "path";

const configuracaoViews = (app: express.Application) => {
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
};

export default configuracaoViews;
