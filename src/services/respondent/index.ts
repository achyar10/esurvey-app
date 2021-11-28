import { BaseResponse, instance } from '../instances';

export interface IRespondent {
    id: number;
    nik: string;
    fullname: string;
    gender: string;
    birthyear: number;
    is_active: boolean;
    created_by: string;
    updated_by: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    education: IDetailsRespondent;
    job_status: IDetailsRespondent;
    job_title: IDetailsRespondent;
    education_id: number;
    job_title_id: number;
    job_status_id: number;
}

export interface IDetailsRespondent {
    id: number;
    name: string;
    created_by: string;
    updated_by: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}


export interface UpdateRespondentPayload {
    id: number;
    nik: string;
    fullname: string;
    gender: string;
    birthyear: number;
    is_active: boolean;
    education: number;
    job_status: number;
    job_title: number;
}

export interface CreateRespondentPayload {
    nik: string;
    fullname: string;
    gender: string;
    birthyear: number;
    is_active: boolean;
    education_id: number;
    job_status_id: number;
    job_title_id: number;
}

export interface GetRespondentPayload {
    page?: number;
    limit?: number;
    query_by?: string;
    query_value?: string;
}

export interface CreateRespondentResponse extends BaseResponse {
    data: IRespondent;
}

export interface GetRespondentResponse extends BaseResponse {
    data: IRespondent[];
}


// Service Endpoints

const url = '/respondent'

export const create = async (payload: CreateRespondentPayload): Promise<CreateRespondentResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const update = async ({ id, ...payload }: UpdateRespondentPayload) => {
    const response = await instance.put(`${url}/${id}`, payload);
    return response.data;
}

export const get = async (payload: GetRespondentPayload): Promise<GetRespondentResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};

export const remove = async (id: number) => {
    const response = await instance.delete(`${url}/${id}`);
    return response.data;
}