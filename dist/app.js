"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const app = (0, express_1.default)();
// settings
app.set('port', process.env.PORT || 3000);
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(login_routes_1.default);
app.get('/', (req, res) => {
    return res.send(`The API is at http://localhost:${app.get('port')}`);
});
exports.default = app;
