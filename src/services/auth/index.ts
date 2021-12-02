import { BaseResponse, instance } from '../instances';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginRespondentPayload {
    nik: string;
}

export interface LoginResponse extends BaseResponse {
    data: {
        user_id: number;
        fullname: string;
        role: string;
        access_token: string;
    };
}

export interface LoginRespondentResponse extends BaseResponse {
    data: {
        respondent_id: number;
        nik: string;
        fullname: string;
        gender: string;
        is_active: boolean;
        education: string;
        job_title: string;
        job_status: string;
        access_token: string;
    };
}

const url = '/auth'

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await instance.post(url + '/login', payload, { auth: payload });
    return response.data;
}

export const loginRespondent = async (payload: LoginRespondentPayload): Promise<LoginRespondentResponse> => {
    const response = await instance.post(url + '/respondent', payload);
    return response.data;
}