import { useSnackbar } from 'notistack';

type typeNotification = 'info' | 'default' | 'error' | 'success' | 'warning' | undefined;

const useNotify = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notify = (message: string, type: typeNotification = 'info') => {
        const key: any = enqueueSnackbar(message, {
            variant: type,
            SnackbarProps: {
                onClick: () => closeSnackbar(key)
            }
        });
        return key;
    };
    return notify;
};

export default useNotify;
