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
        SET CUSTOMER_NAME = $3, GENDER = $4, PHONE_NUMBER = $5, DATE_OF_BIRTH = $6, AVATAR_PICTURE = $7, UPDATED_AT = $8, UPDATED_BY = $9
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

export function getListAllStore () {
    const query = `SELECT * FROM STORE`;
    const values: any = [];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getListAllCustomer () {
    const query = `SELECT * FROM CUSTOMER`;
    const values: any = [];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getStoreById (storeId: string) {
    const query = `SELECT * FROM STORE WHERE STORE_ID = $1`;
    const values: any = [storeId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function updateStoreByStoreId (storeId: string, storeName: string, address: string, 
                            phoneNumber: string, avatarPicture: string, description: string, hiddenData: any) {
    const query = `SELECT * FROM STORE WHERE STORE_ID = $1`;
    const now = localDateTimeUtils.getSystemDateTime();

    const values: any = [storeId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function updateHiddenDataByStoreId (storeId: string, hiddenData: any) {
    const query = `UPDATE STORE SET HIDDEN_DATA = $2, UPDATED_AT = $3
                     WHERE STORE_ID = $1`;
    const now = localDateTimeUtils.getSystemDateTime();

    const values: any = [storeId, hiddenData, now];
    const queryObject = {
    text: query,
    values: values,
    }
    return queryObject;
}

export function getListAllSubscription () {
    const query = `select * from subcription`;
    const values: any = [];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getSubcriptionById (subcriptionId: string) {
    const query = `select * from subcription where  subcription_id = $1`;
    const values: any = [subcriptionId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function updateSubcription (subcriptionId: string, name: string, price: number, description: string) {
const query = `UPDATE subcription
SET name=$2, price = $3, description = $4, updated_at = $5
WHERE STORE_ID = $1 AND LOGIN_ID = $9;`;
const now = localDateTimeUtils.getSystemDateTime();
const values = [subcriptionId, name,  price, description, now];
const queryObject = {
text: query,
values: values,
}
return queryObject;
}

// get comment
export function getListCommentsOfStore (storeId: string) {
    const query = `SELECT comment_id, store_id, sender_id, content, reply_id, status, hidden_data, sender_role
                    from store_comment
                    where store_id = $1`;
    const values = [storeId];
    const queryObject = {
    text: query,
    values: values,
    }
    return queryObject;
}

// get rating
export function getListRatingsOfStore (storeId: string) {
    const query = `SELECT rating_id, store_id, customer_id, status, hidden_data, rating
                    from store_rating
                    where store_id = $1`;
    const values = [storeId];
    const queryObject = {
    text: query,
    values: values,
    }
    return queryObject;
}

// add comment
export function insertStoreComment (commentId: string, storeId: string, customerId: string, content: string, replyId: string | null, status: number, hiddenData: any, userId: string, senderRole: number) {
    const query = `INSERT INTO store_comment(
        comment_id, store_id, sender_id, content, reply_id, status, hidden_data, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, sender_role)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [commentId, storeId, customerId, content, replyId, status, hiddenData, now, userId, now, userId, null, null, senderRole];
    const queryObject = {
    text: query,
    values: values,
    }
    return queryObject;
}

// add or update
export function insertOrUpdateStoreRating (ratingId: string, storeId: string, customerId: string, rating: number, status: number, hiddenData: any, userId: string) {
    const query = `INSERT INTO public.store_rating(
        rating_id, store_id, customer_id, status, hidden_data, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, rating)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (store_id, customer_id) DO UPDATE
        SET rating = $12;`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [ratingId, storeId, customerId, status,hiddenData, now, userId, now, userId, null,null, rating];
    const queryObject = {
    text: query,
    values: values,
    }
    return queryObject;
}