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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const infoDb = __importStar(require("../db/info"));
module.exports = {
    getInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { pages, limit } = req.query;
        const { grade } = req;
        const activate = true;
        if (grade !== 'admin') {
            return res.status(403).json({ message: '해당 권한이 없습니다.' });
        }
        const infos = yield infoDb.AdminGetInfo(Number(pages), Number(limit), activate);
        if (infos.count === 0) {
            return res.status(400).json({ message: '게시물이 존재하지 않습니다.' });
        }
        return res
            .status(200)
            .json({ info: infos, message: '게시물들을 불러왔습니다.' });
    }),
    editInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        const { grade } = req;
        if (grade !== 'admin') {
            return res.status(403).json({ message: '해당 권한이 없습니다.' });
        }
        const info = yield infoDb.getInfo(Number(infoId));
        if (!info) {
            return res
                .status(406)
                .json({ message: '해당 게시물이 존재하지 않습니다.' });
        }
        const { title, content, targetPoint, type, activate } = req.body;
        yield infoDb.adminEditInfo(info.id, title, content, Number(targetPoint), type, activate);
    }),
    removeInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        const { grade } = req;
        console.log(infoId);
        if (grade !== 'admin') {
            return res.status(403).json({ message: '해당 권한이 없습니다.' });
        }
        const info = yield infoDb.getInfo(Number(infoId));
        if (!info) {
            return res
                .status(406)
                .json({ message: '해당 게시물이 존재하지 않습니다.' });
        }
        yield infoDb.removeInfo(Number(infoId));
        return res.status(200).json({ message: '해당 게시물을 삭제하였습니다.' });
    }),
    activateInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        const { grade } = req;
        if (grade !== 'admin') {
            return res.status(403).json({ message: '해당 권한이 없습니다.' });
        }
        const info = yield infoDb.getInfo(Number(infoId));
        if (!info) {
            return res
                .status(406)
                .json({ message: '해당 게시물이 존재하지 않습니다.' });
        }
        const { activate } = req.body;
        yield infoDb.activateInfo(activate, Number(infoId));
        return res.status(200).json({ message: '해당 게시물을 인증하였습니다.' });
    }),
};
