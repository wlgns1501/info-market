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
const replyDb = __importStar(require("../db/reply"));
module.exports = {
    writeReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId } = req.params;
        const { userId } = req;
        const { content } = req.body;
        //const exUser = await userDb.findPkUser(userId);
        const replyData = yield replyDb.writeReply(content, userId, Number(infoId));
        if (!content) {
            return res.status(400).json({ message: '댓글을 입력해 주세요' });
        }
        return res.status(203).json({
            replyId: replyData.id,
            createdAt: replyData.createdAt,
            message: '댓글을 작성했습니다.',
        });
    }),
    putReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId, replyId } = req.params;
        const { userId } = req;
        const { content } = req.body;
        //const exUser = await userDb.findPkUser(userId);
        const exReply = yield replyDb.getReply(replyId);
        if (!content) {
            return res.status(400).json({ message: '댓글을 입력해 주세요' });
        }
        if (userId !== (exReply === null || exReply === void 0 ? void 0 : exReply.userId)) {
            return res
                .status(403)
                .json({ message: '해당 댓글을 작성한 유저가 아닙니다.' });
        }
        yield replyDb.modifyReply(content, userId, Number(infoId), Number(exReply === null || exReply === void 0 ? void 0 : exReply.id));
        return res.status(201).json({ replyId, message: '댓글을 수정했습니다.' });
    }),
    removeReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { infoId, replyId } = req.params;
        const { userId } = req;
        const exReply = yield replyDb.getReply(replyId);
        if (userId !== (exReply === null || exReply === void 0 ? void 0 : exReply.userId)) {
            if ((exReply === null || exReply === void 0 ? void 0 : exReply.userId) === undefined) {
                return res.status(400).json({ message: '이미 삭제된 댓글입니다.' });
            }
            else {
                return res
                    .status(403)
                    .json({ message: '해당 댓글을 작성한 유저가 아닙니다.' });
            }
        }
        yield replyDb.deleteReply(replyId);
        return res.status(203).json({ replyId, message: '댓글을 삭제했습니다.' });
    }),
};
