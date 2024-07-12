import UserCard from 'src/components/Cards/UserCard';
import Layout from 'src/components/Layout';

const DashboardContainer = () => {
    return (
        <Layout isProtectedPage={true}>
            <UserCard />
        </Layout>
    );
};

export default DashboardContainer;
