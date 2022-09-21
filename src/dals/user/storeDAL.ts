import { db } from "../../config/db_config";
import * as userSql from "../sql/userSql";
import * as exception from "../../common/exception";

export async function getListStore() {
    const queryGetListAllStore = userSql.getListAllStore();
    return await db.query(queryGetListAllStore);
}

export async function getStoreById(storeId: string) {
    const queryGetOneStore = userSql.getStoreById(storeId);
    const [store] = await db.query(queryGetOneStore);
    if (!store || store.deleted_at || store.deleted_by) {
        throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_008);
    }
    return store;
}