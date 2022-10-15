import { db } from "../../config/db_config";
import * as userSql from "../sql/userSql";
import * as exception from "../../common/exception";
import * as requestModel from "../../models/StoreModels"


export async function createNewRequest (Object: any) {
    const queryCreate = userSql.createRequest(Object.userId, Object.storeId, Object.type);
    let [request] = await db.query(queryCreate);
    return request;
}

export async function getById (id: number) {
    const queryCreate = userSql.getRequestById(id);
    let [request] = await db.query(queryCreate);
    return request;
}

export async function UpdateRequest (Object: any) {
    const queryCreate = userSql.UpdateStatusRequest(Object.status,Object.id);
     await db.query(queryCreate);
    return true;
}