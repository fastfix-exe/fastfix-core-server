import * as userDAL from "../../dals/user/userDAL";
import * as authService from "../../services/auth/authService"
import { envConfig } from "../../config/env_config";
import * as customerModel from "../../models/CustomerModels";
import * as exception from "../../common/exception";

export async function updateCustomer(loginCustomer: any, customerEntry: any, refreshToken: string) {
    const customerId = loginCustomer.id;
    const email = loginCustomer.email;
    const customer = await userDAL.updateCustomer(customerId, email, customerEntry);

    // delete refreshtoken (temp logout) and generate new tokens
    if (customer) {
        await authService.logout(refreshToken);
        const res = await authService.loginCustomerOrAdmin(email, customer.customer_name, customer.avatar_picture);
        return res;
    } else {
        throw new exception.APIException(exception.HttpStatusCode.SERVER, exception.ErrorMessage.API_E_002);
    }
}

export async function updateStore(loginStore: any, storeEntry: any, refreshToken: string) {
    const storeId = loginStore.id;
    const loginId = loginStore.loginId;
    const store = await userDAL.updateStore(storeId, loginId, storeEntry);

    // delete refreshtoken (temp logout) and generate new tokens
    if (store) {
        await authService.logout(refreshToken);
        const res = await authService.loginRoleStore(loginId, store.password);
        return res;
    } else {
        throw new exception.APIException(exception.HttpStatusCode.SERVER, exception.ErrorMessage.API_E_002);
    }
}