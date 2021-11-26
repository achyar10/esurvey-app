import { BaseResponse, instance } from '../instances';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse extends BaseResponse {
    data: {
        user_id: number;
        fullname: string;
        role: string;
        access_token: string;
    };
}
const url = '/auth/login'
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await instance.post(url, payload, { auth: payload });
    return response.data;
}