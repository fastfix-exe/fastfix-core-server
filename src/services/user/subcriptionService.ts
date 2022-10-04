import * as userDAL from "../../dals/user/userDAL";
import * as storeDAL from "../../dals/user/subcriptionDAL"
import * as authService from "../../services/auth/authService"
import { envConfig } from "../../config/env_config";
import * as subcriptionModels from "../../models/SubcriptionModels";
import * as exception from "../../common/exception";


export async function getListSubscription(loginCustomer: any) {
    const listSubscription = await storeDAL.getListSubscription();
    const res = listSubscription.map((e: subcriptionModels.SubcriptionDB) => subcriptionModels.createJsonObject(e))
                            .filter((e: any) => !e.isDeleted);
    return res;
}

export async function getSubcriptionById(loginCustomer: any, storeId: string) {
    const store = await storeDAL.getSubcriptionById(storeId);
    const res = subcriptionModels.createJsonObject(store)
    return res;
}

export async function updateSubcriptionById(subcriptionEntry: any) {
     
    const res = await storeDAL.updateSubcriptionById(subcriptionEntry);
    return res;
}

