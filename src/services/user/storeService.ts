import * as userDAL from "../../dals/user/userDAL";
import * as storeDAL from "../../dals/user/storeDAL";
import * as authService from "../../services/auth/authService"
import { envConfig } from "../../config/env_config";
import * as storeModel from "../../models/StoreModels";
import * as employeeModel from "../../models/EmployeeModel";
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

export async function getStoreById(loginCustomer: any, storeId: string, currentPotition?: storeModel.Position) {
    const store = await storeDAL.getStoreById(storeId, currentPotition);
    const res = storeModel.customerGetStore(store);
    return res;
}

export async function addFieldHiddenDataForStore(loginCustomer: any, storeId: string, hiddenData: any) {
    // const store: storeModel.StoreDB = await storeDAL.getStoreById(storeId);
    
    const res = await storeDAL.addFieldHiddenData(storeId, hiddenData);
    return res;
}

export async function getStoreCommentByStoreId(loginCustomer: any, storeId: string) {
    const res = await storeDAL.getStoreCommentByStoreId(storeId);
    return res;
}

export async function getStoreRatingByStoreId(loginCustomer: any, storeId: string) {
    const res = await storeDAL.getStoreRatingByStoreId(storeId);
    return res;
}

export async function insertStoreCommentByStoreId(loginUser: any, storeId: string, content: string, replyId?: string) {
    const res = await storeDAL.postStoreComment(loginUser, storeId, content, replyId);
    return res;
}

export async function insertOrUpdateStoreRatingByStoreId(loginUser: any, storeId: string, rating: number) {
    const res = await storeDAL.postStoreRating(loginUser, storeId, rating);
    return res;
}

export async function getCurrentUserRatedStar(loginUser: any, storeId: string) {
    const res = await storeDAL.getCurrentUserRatedStar(loginUser, storeId);
    return res;
}

export async function getListEmployeeByStoreId(storeId: string) {
    const listEmp = await storeDAL.getListEmployeeByStoreId(storeId);
    const res = listEmp.map((e: employeeModel.EmployeeDB) => employeeModel.createJsonObject(e));
    return res;
}

export async function getEmployeeByEmployeeId(employeeId: string) {
    const emp = await storeDAL.getEmpByEmpId(employeeId);
    const res = employeeModel.createJsonObject(emp);
    return res;
}

export async function getEmployeeByCurrentRequestId(currentRequestId: number) {
    const emp = await storeDAL.getEmployeeByCurrentRequestId(currentRequestId);
    const res = employeeModel.createJsonObject(emp);
    return res;
}