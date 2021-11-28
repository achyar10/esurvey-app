import moment from 'moment';

export const formatDate = (date: number | string | Date) => {
    const formatValue = typeof date === 'string' ? new Date(date) : date;

    return moment(formatValue).locale('id').format('DD MMM YYYY');
};

export const formatDateFull = (date: number | string | Date) => {
    const formatValue = typeof date === 'string' ? new Date(date) : date;

    return moment(formatValue).locale('id').format('DD MMM YYYY, HH:mm:ss');
};

export const getCurrentDate = () => moment().locale('id').format('DD MMM YYYY');;