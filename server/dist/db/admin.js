"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = exports.findAdmin = exports.findAdminByPK = void 0;
const admin_1 = __importDefault(require("../models/admin"));
function findAdminByPK(adminId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_1.default.findOne({
            where: { id: adminId },
        });
    });
}
exports.findAdminByPK = findAdminByPK;
function findAdmin(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_1.default.findOne({
            where: {
                email,
            },
        });
    });
}
exports.findAdmin = findAdmin;
function createAdmin(email, hashPw) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_1.default.create({
            email,
            password: hashPw,
        });
    });
}
exports.createAdmin = createAdmin;
