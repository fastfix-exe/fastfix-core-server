import * as requestDAL from "../../dals/user/requestDAL";
import * as requestModels from "../../models/RequestModels"
export async function createNewRequest(Object: any) {  
    const request = await requestDAL.createNewRequest(Object);
    const res = requestModels.createJsonObject(request)
    return res;
}

export async function getById(id: number) {  
    const request = await requestDAL.getById(id);
    const res = requestModels.createJsonObject(request)
    return res;
}

export async function getLatestById() {  
    const request = await requestDAL.getByIdLatest();
    const res = requestModels.createJsonObject(request)
    return res;
}

export async function getListPendingByStoreId(storeId: string) {  
    const request = await requestDAL.getListByStoreIdWithPending(storeId);
    const res = request.map((e: requestModels.RequestDB) => requestModels.createJsonObject(e))
    return res;
}

export async function UpdateRequest(Object: any) {  
     await requestDAL.UpdateRequest(Object);
    return true;
}