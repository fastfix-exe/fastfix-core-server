"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonObject = exports.Subcription = void 0;
class Subcription {
    constructor(subcriptionId, name, price, isDeleted, hiddenData, description) {
        this.id = subcriptionId;
        this.name = name;
        this.isDeleted = isDeleted;
        this.price = price;
        this.hidden_data = hiddenData;
        this.description = description;
    }
}
exports.Subcription = Subcription;
function createJsonObject(data) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    return new Subcription(data.subcription_id, data.name, data.price, isDeleted, data.hidden_data, data.description);
}
exports.createJsonObject = createJsonObject;
//# sourceMappingURL=SubcriptionModels.js.map