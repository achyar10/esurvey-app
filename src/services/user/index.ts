import { BaseResponse, instance } from '../instances';

export interface IUser {
    id: number;
    username: string;
    fullname: string;
    role: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface UpdateUserPayload extends CreateUserPayload {
    user_id: number;
}

export interface CreateUserPayload {
    username: string;
    password?: string;
    fullname: string;
    role: string;
    is_active: boolean;
}

export interface GetUserPayload {
    page?: number;
    limit?: number;
    query_by?: string;
    query_value?: string;
}

export interface CreateUserResponse extends BaseResponse {
    data: IUser;
}

export interface GetUserResponse extends BaseResponse {
    data: IUser[];
}

export interface ResetPasswordUserPayload {
    user_id: number;
    password: string;
}


// Service Endpoints

const url = '/user'

export const createUser = async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const updateUser = async ({ user_id, ...payload }: UpdateUserPayload) => {
    const response = await instance.put(`${url}/${user_id}`, payload);
    return response.data;
}

export const getUser = async (payload: GetUserPayload): Promise<GetUserResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};

export const resetPassUser = async ({ user_id, ...payload }: ResetPasswordUserPayload) => {
    const response = await instance.post(`${url}/${user_id}/rpw`, payload);
    return response.data;
}