import { ILayout } from 'src/interfaces/Layout';
import { useGetUserInfo } from 'src/hooks/API/auth';
import useNotify from 'src/hooks/notify/useNotify';
import { useNavigate } from 'react-router-dom';
import classes from './index.module.less';
import { Spin } from 'antd';

const Layout = ({ children, isProtectedPage = true }: ILayout) => {
    const notify = useNotify();
    const navigate = useNavigate();
    const { isLoading, isError } = useGetUserInfo(isProtectedPage);

    if (isProtectedPage && !isLoading && isError) {
        navigate('/');
        notify('Please sign in again', 'error');
    }

    if (isLoading) {
        return (
            <div className={classes['container']}>
                <Spin />
            </div>
        );
    }
    return <div className={classes['container']}>{children}</div>;
};

export default Layout;
