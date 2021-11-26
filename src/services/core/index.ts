import { instance } from "../instances";


export const ping = () => instance.get('/auth/ping').then((n) => n.data);