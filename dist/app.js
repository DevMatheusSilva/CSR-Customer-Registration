"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./controllers/router"));
const expressStaticSetup_1 = __importDefault(require("./controllers/middlewares/expressStaticSetup"));
const expressFormSetup_1 = __importDefault(require("./controllers/middlewares/expressFormSetup"));
const expressViewsSetup_1 = __importDefault(require("./controllers/middlewares/expressViewsSetup"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(expressStaticSetup_1.default);
(0, expressViewsSetup_1.default)(app);
(0, expressFormSetup_1.default)(app);
(0, router_1.default)(app);
exports.default = app;
