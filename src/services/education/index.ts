import { BaseResponse, instance } from '../instances';

export interface IEducation {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface UpdateEducationPayload extends CreateEducationPayload {
    id: number;
}

export interface CreateEducationPayload {
    name: string;
}

export interface GetEducationPayload {
    page?: number;
    limit?: number;
    query_by?: string;
    query_value?: string;
}

export interface CreateEducationResponse extends BaseResponse {
    data: IEducation;
}

export interface GetEducationResponse extends BaseResponse {
    data: IEducation[];
}

export interface ResetPasswordEducationPayload {
    id: number;
    password: string;
}


// Service Endpoints

const url = '/education'

export const create = async (payload: CreateEducationPayload): Promise<CreateEducationResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const update = async ({ id, ...payload }: UpdateEducationPayload) => {
    const response = await instance.put(`${url}/${id}`, payload);
    return response.data;
}

export const get = async (payload: GetEducationPayload): Promise<GetEducationResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};

export const remove = async (id: number) => {
    const response = await instance.delete(`${url}/${id}`);
    return response.data;
}