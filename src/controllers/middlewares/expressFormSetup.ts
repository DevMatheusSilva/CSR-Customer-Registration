import express from "express";

const configureExpressForm = (app: express.Application): void => {
  app.use(express.urlencoded({ extended: true }));
}

export default configureExpressForm;