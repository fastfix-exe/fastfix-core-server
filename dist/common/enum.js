"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralStatus = exports.RequestStatus = exports.UserStatus = exports.UserRole = exports.CustomerGender = void 0;
var CustomerGender;
(function (CustomerGender) {
    CustomerGender[CustomerGender["male"] = 1] = "male";
    CustomerGender[CustomerGender["female"] = 2] = "female";
    CustomerGender[CustomerGender["other"] = 0] = "other";
})(CustomerGender = exports.CustomerGender || (exports.CustomerGender = {}));
var UserRole;
(function (UserRole) {
    UserRole[UserRole["customer"] = 1] = "customer";
    UserRole[UserRole["store"] = 2] = "store";
    UserRole[UserRole["employee"] = 3] = "employee";
    UserRole[UserRole["administrator"] = 0] = "administrator";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["Activated"] = 0] = "Activated";
    UserStatus[UserStatus["Deleted"] = 1] = "Deleted";
    UserStatus[UserStatus["Approved"] = 2] = "Approved";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus[RequestStatus["Pending"] = 0] = "Pending";
    RequestStatus[RequestStatus["Processing"] = 1] = "Processing";
    RequestStatus[RequestStatus["Success"] = 2] = "Success";
    RequestStatus[RequestStatus["Failed"] = 3] = "Failed";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
var GeneralStatus;
(function (GeneralStatus) {
    GeneralStatus[GeneralStatus["Activating"] = 1] = "Activating";
    GeneralStatus[GeneralStatus["Deleted"] = 0] = "Deleted";
})(GeneralStatus = exports.GeneralStatus || (exports.GeneralStatus = {}));
//# sourceMappingURL=enum.js.map