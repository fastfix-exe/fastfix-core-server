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

export async function getListNearestStore (req: any, res: any, next: any) {
    try {
        const loginCustomer = req.loginUser;
        const latitude = req.body.latitude;
        const longtitude = req.body.longtitude;
        const currentPotition = {
            latitude, longtitude
        }
        const response = await storeService.getListStore(loginCustomer, currentPotition);
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

export async function getStoreAndDistanceByStoreId (req: any, res: any, next: any) {
    try {
        const loginCustomer = req.loginUser;
        const storeId: string = req.params.storeId as string;
        const longtitude: string = req.body.longtitude as string;
        const latitude: string = req.body.latitude as string;
        const currentPotition = {
            latitude, longtitude
        }
        const response = await storeService.getStoreById(loginCustomer, storeId, currentPotition);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function getCurrentUserRatedStar (req: any, res: any, next: any) {
    try {
        const loginCustomer = req.loginUser;
        const storeId: string = req.params.storeId as string;
        const response = await storeService.getCurrentUserRatedStar(loginCustomer, storeId);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}