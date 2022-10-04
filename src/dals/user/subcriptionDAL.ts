import { db } from "../../config/db_config";
import * as userSql from "../sql/userSql";
import * as exception from "../../common/exception";

export async function getListSubscription() {
    const queryGetListAllStore = userSql.getListAllSubscription();
    return await db.query(queryGetListAllStore);
}

export async function getSubcriptionById(subcriptionId: string) {
    const queryGetOneStore = userSql.getSubcriptionById(subcriptionId);
    const [store] = await db.query(queryGetOneStore);
    if (!store || store.deleted_at || store.deleted_by) {
        throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_010);
    }
    return store;
}

export async function updateSubcriptionById(subcriptionEntry: any) {

    const queryGetOneStore = userSql.getSubcriptionById(subcriptionEntry.subcriptionId);
    const [store] = await db.query(queryGetOneStore);

    if (!store) {
        return false;
    }
    
    const queryUpdatehiddenData = userSql.updateSubcription(subcriptionEntry.subcriptionId, subcriptionEntry.email, subcriptionEntry.price, subcriptionEntry.description);
    await db.query(queryUpdatehiddenData);
    return true;
}