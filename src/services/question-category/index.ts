import { BaseResponse, instance } from '../instances';

export interface IQuestionCategory {
    id: number;
    code: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface UpdateQuestionCategoryPayload extends CreateQuestionCategoryPayload {
    id: number;
}

export interface CreateQuestionCategoryPayload {
    name: string;
    code: string;
}

export interface GetQuestionCategoryPayload {
    page?: number;
    limit?: number;
    query_by?: string;
    query_value?: string;
}

export interface CreateQuestionCategoryResponse extends BaseResponse {
    data: IQuestionCategory;
}

export interface GetQuestionCategoryResponse extends BaseResponse {
    data: IQuestionCategory[];
}


// Service Endpoints

const url = '/question-category'

export const create = async (payload: CreateQuestionCategoryPayload): Promise<CreateQuestionCategoryResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const update = async ({ id, ...payload }: UpdateQuestionCategoryPayload) => {
    const response = await instance.put(`${url}/${id}`, payload);
    return response.data;
}

export const get = async (payload: GetQuestionCategoryPayload): Promise<GetQuestionCategoryResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};

export const remove = async (id: number) => {
    const response = await instance.delete(`${url}/${id}`);
    return response.data;
}