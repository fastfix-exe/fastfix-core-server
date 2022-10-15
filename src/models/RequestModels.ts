import * as commonEnums from "../common/enum";

export interface RequestDB  {
    id: number;
    user_id: string;
    store_id: string;
    date_time?: Date;
    type?: string;
    status?: number;
}

export class Request {
    private id: number;
    private userId: string;
    private storeId: string;
    private dateTime?: Date;
    private type?: string;
    private status?: number = commonEnums.RequestStatus.Pending;

    constructor (id: number, userId: string, storeId: string, dateTime?: Date, type?: string, status?: number) {
        this.id =  id;
        this.userId =  userId;
        this.storeId = storeId;
        this.dateTime = dateTime;       
        this.type = type;
        this.status = status;
    }
}
export function createJsonObject (data: RequestDB) {
    
    return new Request(data.id, data.user_id, data.store_id,data.date_time,data.type, data.status);
}