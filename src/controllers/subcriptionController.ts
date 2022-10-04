import { db } from "../config/db_config";
import * as exception from "../common/exception";
import * as subcriptionService from "../services/user/subcriptionService";

export async function getListAllSubscription (req: any, res: any, next: any) {
    try {
        const loginCustomer = req.loginUser;
        const response = await subcriptionService.getListSubscription(loginCustomer);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function getSubcriptionBySubcriptionId (req: any, res: any, next: any) {
    try {
        const loginCustomer = req.loginUser;
        const subcriptionIid: string = req.params.subcriptionId as string;
        const response = await subcriptionService.getSubcriptionById(loginCustomer, subcriptionIid);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function updateSubcriptionById (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');

        const storeEntry = {
            hiddenData: req.body.hiddenData,
        }

        const response = await subcriptionService.updateSubcriptionById(storeEntry);

        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}