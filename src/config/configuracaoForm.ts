import express from "express";

const configuracaoForm = (app: express.Application): void => {
  app.use(express.urlencoded({ extended: true }));
}

export default configuracaoForm;