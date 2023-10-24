"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importStar(require("./user"));
const info_1 = __importStar(require("./info"));
const admin_1 = __importDefault(require("./admin"));
const payment_1 = __importStar(require("./payment"));
const reply_1 = __importStar(require("./reply"));
const like_1 = __importStar(require("./like"));
const point_1 = __importStar(require("./point"));
const pointRefund_1 = __importStar(require("./pointRefund"));
__exportStar(require("./sequelize"), exports);
const db = {
    User: user_1.default,
    Info: info_1.default,
    Admin: admin_1.default,
    Payment: payment_1.default,
    Reply: reply_1.default,
    Like: like_1.default,
    Point: point_1.default,
    PointRefund: pointRefund_1.default,
};
(0, user_1.associate)(db);
(0, info_1.associate)(db);
(0, payment_1.associate)(db);
(0, reply_1.associate)(db);
(0, like_1.associate)(db);
(0, point_1.associate)(db);
(0, pointRefund_1.associate)(db);
