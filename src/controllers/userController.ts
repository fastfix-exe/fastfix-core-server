import * as userService from "../services/user/userService";
import * as storeService from "../services/user/storeService";
import { db } from "../config/db_config";
import * as exception from "../common/exception";

export async function updateCustomer (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');
        const loginCustomer = req.loginUser;
        const customerName: string = req.body.customerName as string ?? loginCustomer.customerName;
        const dateOfBirth: string = req.body.dateOfBirth as string;
        const gender: number = req.body.gender as number;
        const phoneNumber: string = req.body.phoneNumber as string;
        const avatarPicture: string = req.body.avatarPicture as string ?? loginCustomer.avatarPicture;
        const refreshToken: string = req.body.refreshToken as string;

        const customerEntry = {
            customerName, dateOfBirth, gender, phoneNumber, avatarPicture
        }
        const response = await userService.updateCustomer(loginCustomer, customerEntry, refreshToken);
        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}

export async function updateStore (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');
        const loginStore = req.loginUser;

        const storeEntry = {
            email: req.body.email || loginStore.email,
            storeName: req.body.storeName || loginStore.storeName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            avatarPicture: req.body.avatarPicture || loginStore.avatarPicture,
            description: req.body.description,
        }
        const refreshToken: string = req.body.refreshToken as string;

        const response = await userService.updateStore(loginStore, storeEntry, refreshToken);

        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}

export async function updateStoreByStoreId (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');
        const loginStore = req.loginUser;
        const storeId = req.params.storeId;

        const storeEntry = {
            // email: req.body.email || loginStore.email,
            // storeName: req.body.storeName || loginStore.storeName,
            // address: req.body.address,
            // phoneNumber: req.body.phoneNumber,
            // avatarPicture: req.body.avatarPicture || loginStore.avatarPicture,
            // description: req.body.description,
            hiddenData: req.body.hiddenData,
        }

        const response = await storeService.addFieldHiddenDataForStore(loginStore, storeId, storeEntry.hiddenData);

        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}


export async function getCommentOfStoreByStoreId (req: any, res: any, next: any) {
    try {
        const loginStore = req.loginUser;
        const storeId = req.params.storeId;
        const response = await storeService.getStoreCommentByStoreId(loginStore, storeId);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function getRatingOfStoreByStoreId (req: any, res: any, next: any) {
    try {
        const loginStore = req.loginUser;
        const storeId = req.params.storeId;
        const response = await storeService.getStoreRatingByStoreId(loginStore, storeId);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function insertCommentOfStoreByStoreId (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');
        const loginUser = req.loginUser;
        const storeId = req.params.storeId;
        const content: string = req.body.content;
        const replyId: string | undefined = req.body.replyId;
        const response = await storeService.insertStoreCommentByStoreId(loginUser, storeId, content, replyId);
        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query('ROLLBACK');
        return next(error);
    }
}

export async function insertOrUpdateRatingOfStoreByStoreId (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');
        const loginUser = req.loginUser;
        const storeId = req.params.storeId;
        const rating: number = req.body.rating;
        const response = await storeService.insertOrUpdateStoreRatingByStoreId(loginUser, storeId, rating);
        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query('ROLLBACK');
        return next(error);
    }
}