import { BaseResponse, instance } from '../instances';

export interface IJobStatus {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface UpdateJobStatusPayload extends CreateJobStatusPayload {
    id: number;
}

export interface CreateJobStatusPayload {
    name: string;
}

export interface GetJobStatusPayload {
    page?: number;
    limit?: number;
    query_by?: string;
    query_value?: string;
}

export interface CreateJobStatusResponse extends BaseResponse {
    data: IJobStatus;
}

export interface GetJobStatusResponse extends BaseResponse {
    data: IJobStatus[];
}


// Service Endpoints

const url = '/job-status'

export const create = async (payload: CreateJobStatusPayload): Promise<CreateJobStatusResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const update = async ({ id, ...payload }: UpdateJobStatusPayload) => {
    const response = await instance.put(`${url}/${id}`, payload);
    return response.data;
}

export const get = async (payload: GetJobStatusPayload): Promise<GetJobStatusResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};

export const remove = async (id: number) => {
    const response = await instance.delete(`${url}/${id}`);
    return response.data;
}