import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from 'src/utils/redux/store';
import { APIURL } from 'src/constants';
const privateAxios = axios.create({
    baseURL: APIURL
});

privateAxios.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Check if the error is due to an expired access token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const storeData: any = store.getState().user.data;
            try {
                const response = await axios.post(`${APIURL}/auth/refresh`, {
                    refreshToken: storeData.refreshToken,
                    expiresInMins: 30
                });

                privateAxios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                // Ensure headers are defined before setting the Authorization header
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${response.data.accessToken}`
                };
                return privateAxios(originalRequest);
            } catch (refreshError) {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

const privateFetch = async (path: string, method: string = 'GET', data: any = null, additionalHeaders: any = null) => {
    let axiosConfig: any = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const storeData: any = store.getState().user.data;
    if (storeData?.token) {
        axiosConfig = {
            headers: {
                ...axiosConfig.headers,
                Authorization: `Bearer ${storeData.token}`
            }
        };
    }

    // for extra headers
    if (additionalHeaders) {
        axiosConfig = {
            headers: {
                ...axiosConfig.headers,
                ...additionalHeaders
            }
        };
    }

    let params: any = null;
    let finalData: any = data;
    if (method === 'GET') {
        params = data;
        finalData = null;
    }

    return await privateAxios({
        url: path,
        method,
        params: params,
        data: finalData || undefined,
        ...axiosConfig
    });
};

export { privateFetch };
