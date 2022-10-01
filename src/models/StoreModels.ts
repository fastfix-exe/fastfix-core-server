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
}

export interface StoreHiddenData {
    type: string;
}

export class Store {
    private id: string;
    private loginId: string;
    private email: string;
    private storeName: string;
    private phoneNumber?: string;
    private avatarPicture?: string;
    private hiddenData?: StoreHiddenData;
    private isDeleted?: boolean;
    private role: number = commonEnums.UserRole.store;
    private type?: string; // from hiddendata
    constructor (storeId: string, loginId: string, email: string, storeName: string, isDeleted: boolean, phoneNumber?: string, avatarPicture?: string, hiddenData?: any) {
        this.id =  storeId;
        this.loginId =  loginId;
        this.email =  email;
        this.storeName =  storeName;
        this.isDeleted = isDeleted,
        this.phoneNumber =  phoneNumber;
        this.avatarPicture =  avatarPicture;
        this.hiddenData =  hiddenData;
        this.type = hiddenData.type;
    }
}

export function createJsonObject (data: StoreDB) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    return new Store(data.store_id, data.login_id, data.email, data.store_name, isDeleted, data.phone_number, data.avatar_picture, data.hidden_data);
}

export function createJsonObjectWithoutHiddenData (data: StoreDB) {
    return _objectWithoutProperties(createJsonObject(data), ['hiddenData']);
}

export function customerGetStore (data: StoreDB) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    const store = new Store(data.store_id, data.login_id, data.email, data.store_name, isDeleted, data.phone_number, data.avatar_picture, data.hidden_data);
    return _objectWithoutProperties(store, ['role', 'loginId', 'hiddenData']);
}