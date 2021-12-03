import { BaseResponse, instance } from '../instances';

export interface IResult {
    skm: string;
    details: IDetails[]
}

export interface IResultQuestionnaire {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
}

export interface IDetails {
    category_code: string;
    category_name: string;
    total_respondent: number;
    total_value: number;
    average: string;
    nrr: number;
}

export interface GetResultResponse extends BaseResponse {
    data: IResult;
}

export interface GetResultQuestionnaireResponse extends BaseResponse {
    data: IResultQuestionnaire[];
}


// Service Endpoints

const url = '/result';

export const getResult = async (id: number): Promise<GetResultResponse> => {
    const response = await instance.get(`${url}/${id}`);
    return response.data;
};

export const getQuestionnaire = async (): Promise<GetResultQuestionnaireResponse> => {
    const response = await instance.get(`${url}/questionnaire/all`);
    return response.data;
};