import { BaseResponse, instance } from '../instances';

export interface IQuestionnaire {
    id: number;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    is_limit: boolean;
    max_respondent: number;
    created_at: Date;
    updated_at: Date;
}

export interface UpdateQuestionnairePayload extends CreateQuestionnairePayload {
    id: number;
}

export interface CreateQuestionnairePayload {
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    is_limit: boolean;
    max_respondent: number;
}

export interface GetQuestionnairePayload {
    page?: number;
    limit?: number;
    query_by?: string;
    query_value?: string;
}

export interface CreateQuestionnaireResponse extends BaseResponse {
    data: IQuestionnaire;
}

export interface GetQuestionnaireResponse extends BaseResponse {
    data: IQuestionnaire[];
}


// Service Endpoints

const url = '/questionnaire'

export const create = async (payload: CreateQuestionnairePayload): Promise<CreateQuestionnaireResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const update = async ({ id, ...payload }: UpdateQuestionnairePayload) => {
    const response = await instance.put(`${url}/${id}`, payload);
    return response.data;
}

export const get = async (payload: GetQuestionnairePayload): Promise<GetQuestionnaireResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};

export const remove = async (id: number) => {
    const response = await instance.delete(`${url}/${id}`);
    return response.data;
}