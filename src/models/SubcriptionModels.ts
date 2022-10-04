import * as commonEnums from "../common/enum";

export interface SubcriptionDB {
    subcription_id: string;
    name: string;
    price: number;
    description?: string;
    hidden_data?: any;
    created_at?: Date;
    created_by?: string;
    updated_at?: Date;
    updated_by?: string;
    deleted_at?: Date;
    deleted_by?: string;
}

export class Subcription {
    private id: string;
    private name: string;
    private price: number;
    private hidden_data?: any;
    private isDeleted?: boolean;
    private description? : string;
    

    constructor (subcriptionId: string, name: string, price: number, isDeleted: boolean, hiddenData?: any, description?: string) {
        this.id =  subcriptionId;
        this.name =  name;
        this.isDeleted = isDeleted;
        this.price = price;
        this.hidden_data = hiddenData;
        this.description = description
    }
}

export function createJsonObject (data: SubcriptionDB) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    return new Subcription(data.subcription_id, data.name, data.price,isDeleted, data.hidden_data, data.description);
}