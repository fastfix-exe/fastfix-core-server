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
exports.getCustomerAge = exports.createJsonObjectWithoutHiddenData = exports.createJsonObject = exports.Customer = void 0;
const commonEnums = __importStar(require("../common/enum"));
class Customer {
    constructor(customerId, email, customerName, isDeleted, dateOfBirth, gender, phoneNumber, avatarPicture, hiddenData) {
        this.role = commonEnums.UserRole.customer;
        this.id = customerId;
        this.email = email;
        this.customerName = customerName,
            this.isDeleted = isDeleted,
            this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.avatarPicture = avatarPicture;
        this.hiddenData = hiddenData;
    }
}
exports.Customer = Customer;
function createJsonObject(data) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    return new Customer(data.customer_id, data.email, data.customer_name, isDeleted, data.date_of_birth, data.gender, data.phone_number, data.avatar_picture, data.hidden_data);
}
exports.createJsonObject = createJsonObject;
function createJsonObjectWithoutHiddenData(data) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    return new Customer(data.customer_id, data.email, data.customer_name, isDeleted, data.date_of_birth, data.gender, data.phone_number, data.avatar_picture);
}
exports.createJsonObjectWithoutHiddenData = createJsonObjectWithoutHiddenData;
function getCustomerAge(dateOfBirth) {
    if (!dateOfBirth) {
        return -1;
    }
    const ageDifMs = Date.now() - (new Date(dateOfBirth).getTime());
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
exports.getCustomerAge = getCustomerAge;
//# sourceMappingURL=CustomerModels.js.map