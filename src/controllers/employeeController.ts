import { db } from "../config/db_config";
import * as exception from "../common/exception";
import * as storeService from "../services/user/storeService";

export async function getListEmployeeByStoreId (req: any, res: any, next: any) {
    try {
        const loginUser = req.loginUser;
        const storeId = req.params.storeId;
        const response = await storeService.getListEmployeeByStoreId(storeId);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}