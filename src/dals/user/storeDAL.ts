import { db } from "../../config/db_config";
import * as userSql from "../sql/userSql";
import * as exception from "../../common/exception";
import * as storeModel from ".././../models/StoreModels";
import * as locationUtils from ".././../common/utils/LocationUtils";

export async function getListStore() {
    const queryGetListAllStore = userSql.getListAllStore();
    return await db.query(queryGetListAllStore);
}

export async function getListNearestStore(currentPotition: storeModel.Position) {
    const queryGetListAllStore = userSql.getListAllStore();
    const listStore = await db.query(queryGetListAllStore);
    for (const store of listStore) {
        const storeCoordinates = store.hidden_data.coordinates?.split(", ");
        if (!storeCoordinates || !storeCoordinates[0] || !storeCoordinates[1]) {
            continue
        }
        store.distance = locationUtils.distance(currentPotition.latitude, currentPotition.longtitude, storeCoordinates[0], storeCoordinates[1], "K");
    }
    return listStore;
}

export async function getStoreById(storeId: string) {
    const queryGetOneStore = userSql.getStoreById(storeId);
    const [store] = await db.query(queryGetOneStore);
    if (!store || store.deleted_at || store.deleted_by) {
        throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_008);
    }
    return store;
}

export async function updateStoreById(storeId: string, storeEntry: any) {

    const queryGetOneStore = userSql.getStoreById(storeId);
    const [store] = await db.query(queryGetOneStore);

    if (!store) {
        return false;
    }
    
    const queryUpdatehiddenData = userSql.updateHiddenDataByStoreId(storeId, storeEntry.hiddenData);
    await db.query(queryUpdatehiddenData);
    return true;
}

export async function addFieldHiddenData(storeId: string, hiddenData: any) {

    const queryGetOneStore = userSql.getStoreById(storeId);
    const [store] = await db.query(queryGetOneStore);

    if (!store) {
        return false;
    }
    const newHiddenData: any = store.hidden_data;
    for (const prop in hiddenData) {
        newHiddenData[prop] = hiddenData[prop];
    }
    const queryUpdatehiddenData = userSql.updateHiddenDataByStoreId(storeId, newHiddenData);
    await db.query(queryUpdatehiddenData);
    return true;
}