import * as localDateTimeUtils from '../../common/utils/LocalDateTimeUtils';

// get customer's infor
export function getCustomerByEmail (email: string) {
    const query = `SELECT * FROM CUSTOMER WHERE EMAIL = $1`;
    const values = [email];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

// insert customer
export function createCustomer (customerId: string, email: string, customerName: string, avatarPicture: string, hiddenData: any) {
    const query = `INSERT INTO customer(customer_id, email, customer_name, avatar_picture, hidden_data, created_at, created_by, updated_at, updated_by, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $6, $7,0);`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [customerId, email, customerName, avatarPicture, hiddenData, now, email];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getRefreshTokenInDb (refreshToken: string) {
    const query = `SELECT * FROM AUTH_TOKEN WHERE REFRESH_TOKEN = $1`;
    const values = [refreshToken];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function insertRefreshToken (refreshToken: string, userRole: number, userId: string) {
    const query = `INSERT INTO auth_token(id,refresh_token, user_role, user_id)
        VALUES ((SELECT (coalesce(MAX(id)+1,1)) from auth_token),$1, $2, $3);`;
    const values = [refreshToken, userRole, userId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function deleteRefreshToken (refreshToken: string) {
    const query = `delete from auth_token where refresh_token = $1`;
    const values = [refreshToken];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getCustomerByIdAndEmail (customerId: string, email: string) {
    const query = `SELECT * FROM CUSTOMER WHERE customer_id = $1 and email = $2`;
    const values = [customerId, email];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getStoreByLoginIdAndPassword (loginId: string, password: string) {
    const query = `SELECT * FROM STORE WHERE LOGIN_ID = $1 AND PASSWORD = $2`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [loginId, password];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getStoreByStoreIdAndLoginId (storeId: string, loginId: string) {
    const query = `SELECT * FROM STORE WHERE STORE_ID = $1 AND LOGIN_ID = $2`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [storeId, loginId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function updateCustomer (customerId: string, email: string, name: string, gender: number, phoneNumber: string, dateOfBirth: string, avatarPicture: string) {
    const query = `UPDATE CUSTOMER 
        SET CUSTOME_NAME = $3, GENDER = $4, PHONE_NUMBER = $5, DATE_OF_BIRTH = $6, AVATAR_PICTURE = $7, UPDATED_AT = $8, UPDATED_BY = $9
        WHERE customer_id = $1 and email = $2`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [customerId, email, name, gender, phoneNumber, dateOfBirth, avatarPicture, now, email];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function updateStore (storeId: string, email: string, name: string, address: string, phoneNumber: string, 
                                avatarPicture: string, description: string, loginStoreId: string) {
    const query = `UPDATE STORE
	SET email=$2, store_name=$3, address=$4, phone_number=$5, avatar_picture=$6, description=$7, updated_at=$8, updated_by=$9
	WHERE STORE_ID = $1 AND LOGIN_ID = $9;`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [storeId, email, name, address, phoneNumber, avatarPicture, description, now, loginStoreId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}