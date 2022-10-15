export enum CustomerGender {
    male = 1,
    female = 2,
    other = 0,
}

export enum UserRole {
    customer = 1,
    store = 2,
    employee = 3,
    administrator = 0,
}

export enum UserStatus {
    Activated = 0,
    Deleted = 1,
    Approved = 2,
}


export enum RequestStatus{
    Pending = 0,
    Processing =1,
    Success = 2,
    Failed = 3
}

export enum GeneralStatus {
    Activating = 1,
    Deleted = 0,
}