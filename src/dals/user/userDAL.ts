import { db } from "../../config/db_config";
import * as userSql from "../sql/userSql";
import * as exception from "../../common/exception";

export async function updateCustomer(customerId: string, email: string, customerEntry: any) {
    const queryGetCustomer = userSql.getCustomerByIdAndEmail(customerId, email);
    let [customer] = await db.query(queryGetCustomer);

    if (!customer) {
        throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_002);
    }

    const queryUpdateCustomer = userSql.updateCustomer(customerId, email, customerEntry.customerName,
         customerEntry.gender, customerEntry.phoneNumber, customerEntry.dateOfBirth, customerEntry.avatarPicture);

    await db.query(queryUpdateCustomer);

    [customer] = await db.query(queryGetCustomer);
    return customer;
}

export async function updateStore(storeId: string, loginId: string, storeEntry: any) {
    const queryGetStore = userSql.getStoreByStoreIdAndLoginId(storeId, loginId);
    let [store] = await db.query(queryGetStore);

    if (!store) {
        throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_002);
    }

    const queryUpdateStore = userSql.updateStore(storeId, storeEntry.email, storeEntry.storeName, storeEntry.address, 
        storeEntry.phoneNumber, storeEntry.avatarPicture, storeEntry.description, loginId);
    await db.query(queryUpdateStore);
    [store] = await db.query(queryGetStore);
    return store;
}