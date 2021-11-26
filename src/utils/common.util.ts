
export const numberFormat = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const capitalize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const strToBool = (s: string) => {
    let regex = /^\s*(true|1|on)\s*$/i
    return regex.test(s);
};

export const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getEnv = () => {
    return ({
        baseUrl: process.env.REACT_APP_BASE_URL,
    });
};

export const groupBy = <T>(arr: T[], keys: (keyof T)[]): { [key: string]: T[] } => {
    return arr.reduce((storage, item) => {
        const objKey = keys.map((key) => `${item[key]}`).join(':');
        if (storage[objKey]) {
            storage[objKey].push(item);
        } else {
            storage[objKey] = [item];
        }
        return storage;
    }, {} as { [key: string]: T[] });
};