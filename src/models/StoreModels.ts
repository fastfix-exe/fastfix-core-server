import * as commonEnums from "../common/enum";
import { _objectWithoutProperties } from "../common/utils/ObjectUtils";

export interface StoreDB {
    store_id: string;
    login_id: string;
    password: string;
    email: string;
    store_name: string;
    address?: string;
    phone_number?: string;
    avatar_picture?: string;
    description?: string;
    hidden_data?: any;
    created_at?: Date;
    created_by?: string;
    updated_at?: Date;
    updated_by?: string;
    deleted_at?: Date;
    deleted_by?: string;
    status: number;
    distance?: any;
}

export interface Position {
    longtitude: string;
    latitude: string;
}

export interface StoreHiddenData {
    emergency: any;
}

export class Store {
    private id: string;
    private loginId: string;
    private email: string;
    private storeName: string;
    private address?: string;
    private phoneNumber?: string;
    private avatarPicture?: string;
    private hiddenData?: StoreHiddenData;
    private isDeleted?: boolean;
    private role: number = commonEnums.UserRole.store;
    private emergency?: any; // from hiddendata
    private distance?: any;
    private coordinates?: any;
    private rating?: number; // from hiddendata
    constructor (storeId: string, loginId: string, email: string, storeName: string, isDeleted: boolean, address?: string,
             phoneNumber?: string, avatarPicture?: string, hiddenData?: any, distance?: any) {
        this.id =  storeId;
        this.loginId =  loginId;
        this.email =  email;
        this.storeName =  storeName;
        this.isDeleted = isDeleted,
        this.address =  address;
        this.phoneNumber =  phoneNumber;
        this.avatarPicture =  avatarPicture;
        this.hiddenData =  hiddenData;
        this.emergency = hiddenData.emergency;
        this.rating = hiddenData.rating || null;
        this.coordinates = hiddenData.coordinates;
        this.distance = distance || 0;
    }
}

export function createJsonObject (data: StoreDB) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    return new Store(data.store_id, data.login_id, data.email, data.store_name, isDeleted, data.address, data.phone_number, 
        data.avatar_picture, data.hidden_data, data.distance);
}

export function createJsonObjectWithoutHiddenData (data: StoreDB) {
    return _objectWithoutProperties(createJsonObject(data), ['hiddenData']);
}

export function customerGetStore (data: StoreDB) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    const store = new Store(data.store_id, data.login_id, data.email, data.store_name, isDeleted, data.address, data.phone_number,
        data.avatar_picture, data.hidden_data, data.distance);
    return _objectWithoutProperties(store, ['role', 'loginId', 'hiddenData']);
}