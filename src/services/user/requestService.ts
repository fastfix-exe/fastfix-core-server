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

export async function UpdateRequest(Object: any) {  
     await requestDAL.UpdateRequest(Object);
    return true;
}