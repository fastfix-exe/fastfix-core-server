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
exports.updateSubcriptionById = exports.getSubcriptionBySubcriptionId = exports.getListAllSubscription = void 0;
const db_config_1 = require("../config/db_config");
const subcriptionService = __importStar(require("../services/user/subcriptionService"));
function getListAllSubscription(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginCustomer = req.loginUser;
            const response = yield subcriptionService.getListSubscription(loginCustomer);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getListAllSubscription = getListAllSubscription;
function getSubcriptionBySubcriptionId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginCustomer = req.loginUser;
            const subcriptionIid = req.params.subcriptionId;
            const response = yield subcriptionService.getSubcriptionById(loginCustomer, subcriptionIid);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getSubcriptionBySubcriptionId = getSubcriptionBySubcriptionId;
function updateSubcriptionById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const storeEntry = {
                hiddenData: req.body.hiddenData,
            };
            const response = yield subcriptionService.updateSubcriptionById(storeEntry);
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            return next(error);
        }
    });
}
exports.updateSubcriptionById = updateSubcriptionById;
//# sourceMappingURL=subcriptionController.js.map