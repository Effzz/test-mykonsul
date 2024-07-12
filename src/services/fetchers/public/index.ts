import axios, { AxiosResponse } from 'axios';
import { APIURL } from 'src/constants';

const publicAxios = axios.create({
    baseURL: APIURL
});

publicAxios.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const publicFetch = async (path: string, method: string = 'GET', data: any = null, customAuthToken: any = null) => {
    let axiosConfig: any = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (customAuthToken) {
        axiosConfig = {
            headers: {
                Authorization: `Bearer ${customAuthToken}`
            }
        };
    }
    return await publicAxios({
        url: path,
        method,
        data,
        ...axiosConfig
    });
};

export { publicFetch };
