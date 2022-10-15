import { db } from "../../config/db_config";
import * as userSql from "../sql/userSql";
import * as requestSql from "../sql/requestSql";
import * as exception from "../../common/exception";
import * as commonEnums from "../../common/enum";
import * as requestModel from "../../models/RequestModels"
import * as customerModel from "../../models/CustomerModels"


export async function createNewRequest (Object: any) {
    const queryCreate = requestSql.createRequest(Object.userId, Object.storeId, Object.type);
    let [request] = await db.query(queryCreate);
    return request;
}

export async function getById (id: number) {
    const queryGetById = requestSql.getRequestById(id);
    let [request] = await db.query(queryGetById);
    return request;
}

export async function getByIdLatest (loginUser: any) {
    const queryRequestByCustomerId = requestSql.getRequestByIdLatest(loginUser.id);
    let [request] = await db.query(queryRequestByCustomerId);
    return request;
}

export async function getListByStoreIdWithPending (storeId : string) {
    const queryCreate = requestSql.getRequestByStoreIdWithPendingStatus(storeId);
    let request = await db.query(queryCreate);
    return request;
}

export async function getCustomersForRequests (listRequests: requestModel.Request[]) {
    const listRes: any[] = [];
    for (const req of listRequests) {
        const queryGetCustomerbyId = userSql.getCustomerByCustomerId(req.getUserId);
        const [customerDB] = await db.query(queryGetCustomerbyId);
        const customer = customerModel.createJsonObjectWithoutHiddenData(customerDB);
        listRes.push({
            ...req,
            customer
        });
    }
    return listRes;
}

export async function UpdateRequestStatus (loginUser: any, requestId: number, status: number) {
    let currentRequest = await getById(requestId);
    if (currentRequest.status === commonEnums.RequestStatus.Pending && status === commonEnums.RequestStatus.Processing && loginUser.role === commonEnums.UserRole.employee) {
        const queryUpdateLoginEmp = userSql.updateCurrentRequestIdOfLoginEmployee(loginUser.id, requestId);
        await db.query(queryUpdateLoginEmp);
    } else {
        const queryUpdateNullCurrentRequestId = requestSql.updateEmployeeCurrentRequestWhereSentRequestToNull(requestId);
        await db.query(queryUpdateNullCurrentRequestId);
    }
    const queryUpdateStatus = requestSql.UpdateStatusRequest(requestId, status);
    await db.query(queryUpdateStatus);

    currentRequest = await getById(requestId);
    return {
        operator: loginUser,
        requestChanged: requestModel.createJsonObject(currentRequest),
        
    };
}