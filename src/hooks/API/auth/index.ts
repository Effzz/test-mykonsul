import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import useNotify from 'src/hooks/notify/useNotify';
import { publicFetch } from 'src/services/fetchers/public';
import { privateFetch } from 'src/services/fetchers/private';
import { TPayloadSignIn } from 'src/types/signin';

export const useSignIn = () => {
    const notify = useNotify();
    return useMutation(
        (payload: TPayloadSignIn) => {
            return publicFetch('/auth/login', 'POST', payload);
        },
        {
            onError: (error: AxiosError) => {
                const errMessage = error?.message || 'Failed to Sign In';
                notify(errMessage, 'error');
            }
        }
    );
};

export const useGetUserInfo = (enabled: boolean) => {
    const queryKey: string = 'user-info';

    return useQuery(
        [queryKey],
        () => {
            return privateFetch('/auth/me', 'GET');
        },
        {
            refetchOnWindowFocus: false,
            retry: false,
            keepPreviousData: false,
            enabled: enabled
        }
    );
};
