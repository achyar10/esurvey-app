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

export interface CreateUserPayload {
    username: string;
    password: string;
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

export interface GetUserResponse extends BaseResponse {
    data: IUser[];
}
const url = '/user'

export const createUser = async (payload: CreateUserPayload): Promise<GetUserResponse> => {
    const response = await instance.post(url, payload, { auth: payload });
    return response.data;
}

export const getUser = async (payload: GetUserPayload): Promise<GetUserResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};