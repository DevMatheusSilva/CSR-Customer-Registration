"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = __importDefault(require("./routers/Router"));
const configuracaoForm_1 = __importDefault(require("./config/configuracaoForm"));
const configuracaoViews_1 = __importDefault(require("./config/configuracaoViews"));
const configArquivosEstaticos_1 = __importDefault(require("./config/configArquivosEstaticos"));
const app = (0, express_1.default)();
(0, configArquivosEstaticos_1.default)(app);
(0, configuracaoViews_1.default)(app);
(0, configuracaoForm_1.default)(app);
(0, Router_1.default)(app);
exports.default = app;
