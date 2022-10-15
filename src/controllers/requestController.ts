import { db } from "../config/db_config";
import * as exception from "../common/exception";
import * as requestService from "../services/user/requestService"
import * as storeService from "../services/user/storeService"
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
        const response = await requestService.getRequestByRequestId(id);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function getRequestLatest (req: any, res: any, next: any) {
    try {
        const loginUser = req.loginUser;
        const response = await requestService.getLatestById(loginUser);
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

export async function UpdateRequestStatus (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');
        const loginUser = req.loginUser;
        const requestId = req.body.id;
        const status = req.body.status;
        const response = await requestService.UpdateRequestStatus(loginUser, requestId, status);
        console.log('__Start sending msg REQUEST-CHANGED');
        req.app.get('socketio').emit('changed-request', response);
        console.log('__End sending msgREQUEST-CHANGED');
        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}

export async function assignEmployeeForRequest (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');
        const loginUser = req.loginUser;
        const requestId = req.body.id;
        const employeeId = req.body.employeeId;
        const response = await requestService.assignEmployeeForRequest(loginUser, requestId, employeeId);
        console.log('__Start sending msg REQUEST-CHANGED');
        req.app.get('socketio').emit('changed-request', response);
        console.log('__End sending msgREQUEST-CHANGED');
        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}

export async function customerChangePosition (req: any, res: any, next: any) {
    try {
        const loginUser = req.loginUser; // customer
        const requestId = req.body.requestId;
        const coordinates = req.body.coordinates;
        const request = await requestService.getRequestByRequestId(requestId);
        console.log(request)
        const employee = await storeService.getEmployeeByCurrentRequestId(request.getId);
        // const customer = await storeService.getCustomerByCustomerId(request.getUserId);
        const response = {
            userId: request.getUserId,
            customerCoordinates: coordinates,
            employeeId: employee.getEmployeeId,
        }
        console.log('__Start sending msg customer-change-coordinates');
        req.app.get('socketio').emit('customer-change-coordinates', response);
        console.log('__End sending msg customer-change-coordinates');
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function employeeChangePosition (req: any, res: any, next: any) {
    try {
        const loginUser = req.loginUser; // employee
        const requestId = req.body.requestId;
        const coordinates = req.body.coordinates;
        const request = await requestService.getRequestByRequestId(requestId);
        const employee = await storeService.getEmployeeByCurrentRequestId(request.getId);
        // const customer = await storeService.getCustomerByCustomerId(request.getUserId);
        const response = {
            userId: request.getUserId,
            employeeCoordinates: coordinates,
            employee,
        }
        console.log('__Start sending msg employee-change-coordinates');
        req.app.get('socketio').emit('employee-change-coordinates', response);
        console.log('__End sending msg employee-change-coordinates');
        res.json(response);
    } catch (error) {
        return next(error);
    }
}