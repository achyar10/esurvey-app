import { BaseResponse, instance } from '../instances';

export interface IQuestionnaireRespondent {
    id: number;
    suggestion: string;
    created_at: Date;
    updated_at: Date;
}

export interface UpdateQuestionnaireRespondentPayload extends CreateQuestionnaireRespondentPayload {
    id: number;
}

export interface CreateQuestionnaireRespondentPayload {
    respondent_id: number;
    suggestion: string;
    answers: IAnswer[];
}

export interface IAnswer {
    question_answer: number;
}

export interface GetQuestionnaireRespondentPayload {
    page?: number;
    limit?: number;
    query_by?: string;
    query_value?: string;
}

export interface CreateQuestionnaireRespondentResponse extends BaseResponse {
    data: IQuestionnaireRespondent;
}

export interface GetQuestionnaireRespondentResponse extends BaseResponse {
    data: IQuestionnaireRespondent[];
}

export interface ResetPasswordQuestionnaireRespondentPayload {
    id: number;
    password: string;
}


// Service Endpoints

const url = '/questionnaire-respondent';

export const create = async (payload: CreateQuestionnaireRespondentPayload): Promise<CreateQuestionnaireRespondentResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const update = async ({ id, ...payload }: UpdateQuestionnaireRespondentPayload) => {
    const response = await instance.put(`${url}/${id}`, payload);
    return response.data;
}

export const get = async (payload: GetQuestionnaireRespondentPayload): Promise<GetQuestionnaireRespondentResponse> => {
    const response = await instance.get(url, { params: payload });
    return response.data;
};

export const remove = async (id: number) => {
    const response = await instance.delete(`${url}/${id}`);
    return response.data;
}