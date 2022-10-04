import * as userDAL from "../../dals/user/userDAL";
import * as storeDAL from "../../dals/user/storeDAL";
import * as authService from "../../services/auth/authService"
import { envConfig } from "../../config/env_config";
import * as storeModel from "../../models/StoreModels";
import * as exception from "../../common/exception";

export async function getListStore(loginCustomer: any, currentPotition?: storeModel.Position) {
    if (currentPotition) {
        const listStore = await storeDAL.getListNearestStore(currentPotition);
        const res = listStore.map((e: storeModel.StoreDB) => storeModel.customerGetStore(e))
                            .filter((e: any) => !e.isDeleted).sort((a: any, b: any) => a.distance - b.distance);
        return res;
    }
    const listStore = await storeDAL.getListStore();
    const res = listStore.map((e: storeModel.StoreDB) => storeModel.customerGetStore(e))
                            .filter((e: any) => !e.isDeleted);
    return res;
}

export async function getStoreById(loginCustomer: any, storeId: string) {
    const store = await storeDAL.getStoreById(storeId);
    const res = storeModel.customerGetStore(store);
    return res;
}

export async function addFieldHiddenDataForStore(loginCustomer: any, storeId: string, hiddenData: any) {
    // const store: storeModel.StoreDB = await storeDAL.getStoreById(storeId);
    
    const res = await storeDAL.addFieldHiddenData(storeId, hiddenData);
    return res;
}