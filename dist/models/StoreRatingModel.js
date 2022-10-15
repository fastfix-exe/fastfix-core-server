"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonObject = exports.Rating = void 0;
class Rating {
    constructor(ratingId, storeId, customerId, rating, status, hiddenData) {
        this.ratingId = ratingId;
        this.storeId = storeId;
        this.customerId = customerId;
        this.rating = rating;
        this.status = status;
        this.hiddenData = hiddenData;
    }
    get getRating() {
        return this.rating;
    }
}
exports.Rating = Rating;
function createJsonObject(data) {
    return new Rating(data.rating_id, data.store_id, data.customer_id, data.rating, data.status, data.hidden_data);
}
exports.createJsonObject = createJsonObject;
//# sourceMappingURL=StoreRatingModel.js.map