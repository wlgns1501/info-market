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
const searchDb = __importStar(require("../db/search"));
module.exports = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { search_type, info_type, pages, limit } = req.query;
        if (search_type === 'titles') {
            const { titles } = req.query;
            if (!titles) {
                return res.status(400).json({ message: '제목을 입력해 주세요.' });
            }
            if (info_type === 'All') {
                const findInfoBy = yield searchDb.searchAllTitle(String(titles), Number(pages), Number(limit));
                if (findInfoBy.count === 0) {
                    return res.status(406).json({ message: '해당 게시물이 없습니다.' });
                }
                return res
                    .status(200)
                    .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
            }
            else {
                const findInfoBy = yield searchDb.searchByTitle(String(titles), Number(pages), Number(limit), String(info_type));
                if (findInfoBy.count === 0) {
                    return res.status(406).json({ message: '해당 게시물이 없습니다.' });
                }
                return res
                    .status(200)
                    .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
            }
        }
        else if (search_type === 'content') {
            const { content } = req.query;
            if (!content) {
                return res.status(400).json({ message: '내용을 입력해 주세요.' });
            }
            if (info_type === 'All') {
                const findInfoBy = yield searchDb.searchAllContent(String(content), Number(pages), Number(limit));
                if (findInfoBy.count === 0) {
                    return res.status(406).json({ message: '해당 게시물이 없습니다.' });
                }
                return res
                    .status(200)
                    .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
            }
            else {
                const findInfoBy = yield searchDb.searchByContent(String(content), Number(pages), Number(limit), String(info_type));
                if (findInfoBy.count === 0) {
                    return res.status(406).json({ message: '해당 게시물이 없습니다.' });
                }
                return res
                    .status(200)
                    .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
            }
        }
        else if (search_type === 'nickname') {
            const { nickname } = req.query;
            if (!nickname) {
                return res.status(400).json({ message: '내용을 입력해 주세요.' });
            }
            if (info_type === 'All') {
                const findInfoBy = yield searchDb.searchAllNick(String(nickname), Number(pages), Number(limit));
                if (findInfoBy.count === 0) {
                    return res.status(406).json({ message: '해당 게시물이 없습니다.' });
                }
                return res
                    .status(200)
                    .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
            }
            else {
                const findInfoBy = yield searchDb.searchByNick(String(nickname), Number(pages), Number(limit), String(info_type));
                if (findInfoBy.count === 0) {
                    return res.status(406).json({ message: '해당 게시물이 없습니다.' });
                }
                return res
                    .status(200)
                    .json({ info: findInfoBy, message: '해당 게시물을 불러왔습니다.' });
            }
        }
    }),
};
