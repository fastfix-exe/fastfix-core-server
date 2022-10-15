import * as commonEnums from "../common/enum";

export interface RatingDB {
    rating_id: string,
    store_id: string,
    customer_id: string,
    rating: number,
    status: number,
    hidden_data: any,
}


export class Rating {
    private ratingId: string;
    private storeId: string;
    private customerId: string;
    private rating: number;
    private status: number;
    private hiddenData?: string;

    constructor (ratingId: string, storeId: string, customerId: string, rating: number, status: number, hiddenData?: any){
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

export function createJsonObject (data: RatingDB) {
    return new Rating(data.rating_id, data.store_id, data.customer_id, data.rating, data.status, data.hidden_data);
}