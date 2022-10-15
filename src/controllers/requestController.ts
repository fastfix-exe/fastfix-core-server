import { db } from "../config/db_config";
import * as exception from "../common/exception";
import * as requestService from "../services/user/requestService"
export async function createRequest (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');

        const response = await requestService.createNewRequest(req.body);

        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}

export async function getRequestById (req: any, res: any, next: any) {
    try {
        const id: number = req.params.id as number;
        const response = await requestService.getById(id);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function getRequestLatest (req: any, res: any, next: any) {
    try {
        const response = await requestService.getLatestById();
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function getListPendingRequestByStoreId (req: any, res: any, next: any) {
    try {
        const storeId: string = req.params.storeId as string;
        const response = await requestService.getListPendingByStoreId(storeId);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function UpdateRequest (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');

        const response = await requestService.UpdateRequest(req.body);

        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}

