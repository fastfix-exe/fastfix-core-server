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
exports.createJsonObjectWithoutHiddenData = exports.createJsonObject = exports.Employee = void 0;
const commonEnums = __importStar(require("../common/enum"));
class Employee {
    constructor(employeeId, storeId, loginId, employeeName, status, currentRequestId, phoneNumber, avatarPicture, hiddenData) {
        this.role = commonEnums.UserRole.employee;
        this.id = employeeId;
        this.storeId = storeId;
        this.loginId = loginId;
        this.employeeName = employeeName,
            this.status = status,
            this.currentRequestId = currentRequestId,
            this.phoneNumber = phoneNumber,
            this.avatarPicture = avatarPicture;
        this.hiddenData = hiddenData;
    }
}
exports.Employee = Employee;
function createJsonObject(data) {
    return new Employee(data.employee_id, data.store_id, data.login_id, data.employee_name, data.status, data.current_request_id, data.phone_number, data.avatar_picture, data.hidden_data);
}
exports.createJsonObject = createJsonObject;
function createJsonObjectWithoutHiddenData(data) {
    return new Employee(data.employee_id, data.store_id, data.login_id, data.employee_name, data.status, data.current_request_id, data.phone_number, data.avatar_picture);
}
exports.createJsonObjectWithoutHiddenData = createJsonObjectWithoutHiddenData;
//# sourceMappingURL=EmployeeModel.js.map