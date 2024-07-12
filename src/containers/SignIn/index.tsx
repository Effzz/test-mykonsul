import classes from './index.module.less';
import { Form, Input, Button } from 'antd';
import useNotify from 'src/hooks/notify/useNotify';
import { useSignIn } from 'src/hooks/API/auth';
import { TPayloadSignIn } from 'src/types/signin';
import Layout from 'src/components/Layout';
import { useDispatch } from 'react-redux';
import { setData as setUserData } from 'src/utils/redux/slices/user';
import { useNavigate } from 'react-router-dom';

const SignInContainer = () => {
    const { mutate: signInProcess, isLoading } = useSignIn();
    const [form] = Form.useForm();
    const notify = useNotify();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values: TPayloadSignIn) => {
        const payload = {
            username: values.username,
            password: values.password,
            expiresInMins: 30
        };
        signInProcess(payload, {
            onSuccess: (res) => {
                dispatch(setUserData(res.data));
                notify('Successfully signed in', 'success');
                navigate('/dashboard');
            }
        });
    };

    return (
        <Layout isProtectedPage={false}>
            <div className={classes['form']}>
                <h1>Sign In</h1>
                <Form form={form} name='login' initialValues={{ remember: true }} onFinish={onFinish} layout='vertical'>
                    <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' className={classes['button']} loading={isLoading}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    );
};

export default SignInContainer;
