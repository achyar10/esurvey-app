import moment from 'moment';

export const formatDate = (date: number | string | Date) => {
    const formatValue = typeof date === 'string' ? new Date(date) : date;

    return moment(formatValue).locale('id').format('DD MMM YYYY');
};

export const formatDateFull = (date: number | string | Date) => {
    const formatValue = typeof date === 'string' ? new Date(date) : date;

    return moment(formatValue).locale('id').format('DD MMM YYYY, HH:mm:ss');
};

export const formatDateBetween = (start_date: number | string | Date, end_date: number | string | Date) => {
    const formatValueStart = typeof start_date === 'string' ? new Date(start_date) : start_date;
    const formatValueEnd = typeof end_date === 'string' ? new Date(end_date) : end_date;
    const now = moment().format('YYYY-MM-DD')
    return moment(now).isBetween(formatValueStart, formatValueEnd) ? true : false;
};

export const getCurrentDate = () => moment().locale('id').format('DD MMM YYYY');;