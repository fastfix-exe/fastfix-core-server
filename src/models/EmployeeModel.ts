import * as commonEnums from "../common/enum";

export interface EmployeeDB {
    employee_id: string;
    store_id: string;
    login_id: string;
    password: string;
    employee_name: string;
    phone_number?: string;
    avatar_picture?: string;
    hidden_data?: any;
    created_at?: Date;
    created_by?: string;
    updated_at?: Date;
    updated_by?: string;
    deleted_at?: Date;
    deleted_by?: string;
    status: number;
    current_request_id: number | null;
}


export class Employee {
    private id: string;
    private storeId: string;
    private loginId: string;
    private employeeName: string;
    private phoneNumber?: string;
    private avatarPicture?: string;
    private hiddenData?: any;
    private status: number;
    private currentRequestId: number | null;
    private role: number = commonEnums.UserRole.employee;

    constructor (employeeId: string, storeId: string, loginId: string, employeeName: string, status: number, currentRequestId: number | null, phoneNumber?: string,
                    avatarPicture?: string, hiddenData?: any) {
        this.id =  employeeId;
        this.storeId =  storeId;
        this.loginId =  loginId;
        this.employeeName = employeeName,
        this.status = status,
        this.currentRequestId = currentRequestId,
        this.phoneNumber = phoneNumber,
        this.avatarPicture =  avatarPicture;
        this.hiddenData =  hiddenData;
    }

    get getEmployeeId() {
        return this.id;
    }
}

export function createJsonObject (data: EmployeeDB) {
    return new Employee(data.employee_id, data.store_id, data.login_id, data.employee_name, data.status, data.current_request_id, data.phone_number, data.avatar_picture, data.hidden_data);
}

export function createJsonObjectWithoutHiddenData (data: EmployeeDB) {
    return new Employee(data.employee_id, data.store_id, data.login_id, data.employee_name, data.status, data.current_request_id, data.phone_number, data.avatar_picture);
}