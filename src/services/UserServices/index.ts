import { CrudServices, IFilterParams } from "../base/ICrudServices";

export interface IUser {
    created?: Date
    updated?: Date | undefined
    deleted?: boolean,
    deletedOn?: any,
    id?: number | null,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    country: string,
    password?: string | null,
    phone: string,
    profession?: string,
    birthday?: Date,
    address?: string,
    state?: string | null,
    profilimage?: string | null,
    city?: string | null,
    tag?: string | null,
    roleId?:number
    selected?: boolean | null,
}

class UserServices extends CrudServices<IUser> {
    controllerPath = 'api/v1/users';

    getMany(params: IFilterParams) {
        return super.getMany(params);
    }
    
    get(id: string) {
        return super.get(id);
    }
    
    create(data: IUser) {
        return super.create(data);
    }
    
    update(id: string, data: IUser) {
        return super.update(id, data);
    }
    
    delete(id: string) {
        return super.delete(id);
    }

}

export default UserServices;