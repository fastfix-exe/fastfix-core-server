import * as commonEnums from "../common/enum";
export class Administrator {
    private id: string;
    private email: string;
    private name: string;
    private avatarPicture: string;
    private role: number = commonEnums.UserRole.administrator;

    constructor (id: string, email: string, name: string, avatarPicture: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.avatarPicture = avatarPicture;
    }
}

export function createJsonObject (data: any) {
    return new Administrator(data.id, data.email, data.name, data.avatarPicture);
}
