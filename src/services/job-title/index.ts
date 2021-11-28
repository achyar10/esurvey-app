import { BaseResponse, instance } from '../instances';

export interface IJobTitle {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface UpdateJobTitlePayload extends CreateJobTitlePayload {
    id: number;
}

export interface CreateJobTitlePayload {
    name: string;
}

export interface GetJobTitlePayload {
    page?: number;
    limit?: number;
    query_by?: string;
    query_value?: string;
}

export interface CreateJobTitleResponse extends BaseResponse {
    data: IJobTitle;
}

export interface GetJobTitleResponse extends BaseResponse {
    data: IJobTitle[];
}


// Service Endpoints

const url = '/job-title'

export const create = async (payload: CreateJobTitlePayload): Promise<CreateJobTitleResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const update = async ({ id, ...payload }: UpdateJobTitlePayload) => {
    const response = await instance.put(`${url}/${id}`, payload);
    return response.data;
}

export const get = async (payload: GetJobTitlePayload): Promise<GetJobTitleResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};

export const remove = async (id: number) => {
    const response = await instance.delete(`${url}/${id}`);
    return response.data;
}