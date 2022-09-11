export class APIException extends Error {
    type: number = 0;
    message: string = "";

    constructor(type: number, message: string) {
        super(message)
        this.type = type;
        this.message = message;
    }
}

export function createErrorJsonObject(exception: APIException){
    var jsonObject = {
        type: exception.type,
        message: exception.message,
    };
    return jsonObject;
}

export const HttpStatusCode = {
    // Bad Request
    CLIENT_BAD_REQUEST: 400,
    // Unauthorized
    UNAUTHORIZED: 401,
    // Forbidden
    CLIENT_FORBIDDEN: 403,
    // Not Found
    CLIENT_NOT_FOUND: 404,
    // Internal Server Error
    SERVER: 500
}

export const ErrorMessage = {
    API_E_001: "Invalid endpoint!",
    API_E_002: "Something went wrong!",
    API_E_003: "You are not customer!",
    API_E_004: "You are not authorized!",
    API_E_005: "JWT expired!",
}