import * as localDateTimeUtils from '../../common/utils/LocalDateTimeUtils';
import * as commonEnums from "../../common/enum";
export function createRequest (userId: string, storeId: string, type : string ) {
    const query = `insert into request(id, user_id, store_id, date_time, type, status)
    VALUES ((SELECT (coalesce(MAX(id)+1,1)) from request) ,$1, $2, $3, $4, $5)
    returning id;`;
    const now = localDateTimeUtils.getSystemDateTime();
    const status = commonEnums.RequestStatus.Pending;
    const values = [userId, storeId, now,type,status ];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getRequestById (id: number) {
    const query = `select * from request where id = $1`;
    const values: any = [id];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getRequestByIdLatest (customerId: string) {
    const query = `select  *  from request where user_id = $1 ORDER BY id DESC limit 1`;
    const values: any = [customerId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getRequestByStoreIdWithPendingStatus (storeId : string) {
    const query = `select * from request where store_id = $1 and (status = 1 or status = 0) `;
    const values: any = [storeId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function UpdateStatusRequest (requestId: number, status: number) {
    const query = `update request set status = $2 where id = $1;`;
    const values = [requestId, status];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function updateEmployeeCurrentRequestWhereSentRequestToNull (requestId: number) {
    const query = `update store_employee set current_request_id = null where current_request_id = $1;`;
    const values = [requestId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}