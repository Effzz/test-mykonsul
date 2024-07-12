import { useQueryClient } from 'react-query';
import classes from './index.module.less';
import { Card, Row } from 'antd';
import UserInfoRow from 'src/components/Rows/UserInfoRow';
import { useDispatch } from 'react-redux';
import { destroyData } from 'src/utils/redux/slices/user';
import useNotify from 'src/hooks/notify/useNotify';
import { useNavigate } from 'react-router-dom';

const UserCard = () => {
    const notify = useNotify();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const resData: any = queryClient.getQueryData('user-info');
    const userData = resData.data;

    const handleLogout = () => {
        dispatch(destroyData());
        notify('Successfully Log Out');
        navigate('/');
    };

    if (!userData) {
        return null;
    }

    const renderUserInfoRows = (data: any, parentKey = ''): JSX.Element[] => {
        return Object.entries(data).flatMap(([key, value]) => {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return renderUserInfoRows(value, fullKey);
            } else {
                return <UserInfoRow key={fullKey} label={fullKey} value={value} />;
            }
        });
    };

    return (
        <Card
            title='User Information'
            extra={
                <button className={classes['logout']} title='Log out' onClick={() => handleLogout()}>
                    Log Out
                </button>
            }
            className={classes['user-card']}
        >
            <Row wrap>{renderUserInfoRows(userData)}</Row>
        </Card>
    );
};
export default UserCard;
