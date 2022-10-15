import * as requestDAL from "../../dals/user/requestDAL";
import * as requestModels from "../../models/RequestModels"
export async function createNewRequest(Object: any) {  
    const request = await requestDAL.createNewRequest(Object);
    const res = requestModels.createJsonObject(request)
    return res;
}

export async function getRequestByRequestId(id: number) {  
    const request = await requestDAL.getRequestByRequestId(id);
    const res = requestModels.createJsonObject(request)
    return res;
}

export async function getLatestById(loginUser: any) {  
    const request = await requestDAL.getByIdLatest(loginUser);
    const res = requestModels.createJsonObject(request)
    return res;
}

export async function getListPendingByStoreId(storeId: string) {  
    const request = await requestDAL.getListByStoreIdWithPending(storeId);
    const listReq: any = request.map((e: requestModels.RequestDB) => requestModels.createJsonObject(e));
    const convertedFullDataRequests = await requestDAL.getCustomersForRequests(listReq);
    return convertedFullDataRequests;
}

export async function UpdateRequestStatus(loginUser: any, requestId: number, status: number) {
     return await requestDAL.UpdateRequestStatus(loginUser, requestId, status);
}