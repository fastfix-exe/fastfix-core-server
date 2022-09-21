import * as userDAL from "../../dals/user/userDAL";
import * as storeDAL from "../../dals/user/storeDAL";
import * as authService from "../../services/auth/authService"
import { envConfig } from "../../config/env_config";
import * as storeModel from "../../models/StoreModels";
import * as exception from "../../common/exception";

export async function getListStore(loginCustomer: any) {
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