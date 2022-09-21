import { db } from "../config/db_config";
import * as exception from "../common/exception";
import * as storeService from "../services/user/storeService";

export async function getListStore (req: any, res: any, next: any) {
    try {
        const loginCustomer = req.loginUser;
        const response = await storeService.getListStore(loginCustomer);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function getStoreByStoreId (req: any, res: any, next: any) {
    try {
        const loginCustomer = req.loginUser;
        const storeId: string = req.params.storeId as string;
        const response = await storeService.getStoreById(loginCustomer, storeId);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}