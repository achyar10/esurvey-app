import { BaseResponse, instance } from '../instances';
import { IQuestionCategory } from '../question-category';

export interface IQuestion {
    id: number;
    description: string;
    is_active: boolean;
    question_category_id: number;
    created_at: Date;
    updated_at: Date;
    question_category: IQuestionCategory;
    answers: IAnswer[]
}

export interface IAnswer {
    id?: number;
    index_code: string;
    index_name: string;
    question_id?: number;
    question?: number;
}

export interface UpdateQuestionPayload {
    id: number;
    description: string;
    is_active: boolean;
    question_category: number;
    answers: IAnswer[];
}

export interface CreateQuestionPayload {
    description: string;
    is_active: boolean;
    question_category_id: number;
    answers: IAnswer[]

}

export interface GetQuestionPayload {
    page?: number;
    limit?: number;
    query_by?: string;
    query_value?: string;
}

export interface CreateQuestionResponse extends BaseResponse {
    data: IQuestion;
}

export interface GetQuestionResponse extends BaseResponse {
    data: IQuestion[];
}


// Service Endpoints

const url = '/question'

export const create = async (payload: CreateQuestionPayload): Promise<CreateQuestionResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const update = async ({ id, ...payload }: UpdateQuestionPayload) => {
    const response = await instance.put(`${url}/${id}`, payload);
    return response.data;
}

export const get = async (payload: GetQuestionPayload): Promise<GetQuestionResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};

export const remove = async (id: number) => {
    const response = await instance.delete(`${url}/${id}`);
    return response.data;
}