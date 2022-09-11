import * as commonEnums from "../common/enum";

export interface CustomerDB {
    customer_id: string;
    email: string;
    customer_name: string;
    date_of_birth?: string;
    gender?: number;
    phone_number?: string;
    avatar_picture?: string;
    hidden_data?: any;
    created_at?: Date;
    created_by?: string;
    updated_at?: Date;
    Updated_by?: string;
    deleted_at?: Date;
    deleted_by?: string;
}


export class Customer {
    private id: string;
    private email: string;
    private customerName: string;
    private dateOfBirth?: string;
    private gender?: number;
    private phoneNumber?: string;
    private avatarPicture?: string;
    private hiddenData?: any;
    private isDeleted?: boolean;
    private role: number = commonEnums.UserRole.customer;

    constructor (customerId: string, email: string, customerName: string, isDeleted: boolean, dateOfBirth?: string, gender?: number, phoneNumber?: string,
                    avatarPicture?: string, hiddenData?: any) {
        this.id =  customerId;
        this.email =  email;
        this.customerName = customerName,
        this.isDeleted = isDeleted,
        this.dateOfBirth =  dateOfBirth;
        this.gender =  gender;
        this.phoneNumber =  phoneNumber;
        this.avatarPicture =  avatarPicture;
        this.hiddenData =  hiddenData;
    }
}

export function createJsonObject (data: CustomerDB) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    return new Customer(data.customer_id, data.email, data.customer_name, isDeleted, data.date_of_birth, data.gender, data.phone_number, data.avatar_picture, data.hidden_data);
}

export function createJsonObjectWithoutHiddenData (data: CustomerDB) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    return new Customer(data.customer_id, data.email, data.customer_name, isDeleted, data.date_of_birth, data.gender, data.phone_number, data.avatar_picture);
}

export function getCustomerAge(dateOfBirth?: string) {
    if (!dateOfBirth) {
        return -1;
    }
    const ageDifMs = Date.now() - (new Date(dateOfBirth).getTime());
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}