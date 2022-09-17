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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonObject = exports.Administrator = void 0;
const commonEnums = __importStar(require("../common/enum"));
class Administrator {
    constructor(id, email, name, avatarPicture) {
        this.role = commonEnums.UserRole.administrator;
        this.id = id;
        this.email = email;
        this.name = name;
        this.avatarPicture = avatarPicture;
    }
}
exports.Administrator = Administrator;
function createJsonObject(data) {
    return new Administrator(data.id, data.email, data.name, data.avatarPicture);
}
exports.createJsonObject = createJsonObject;
//# sourceMappingURL=AdministratorModels.js.map