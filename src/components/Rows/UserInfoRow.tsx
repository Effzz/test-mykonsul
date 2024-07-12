import React from 'react';
import { Row, Col } from 'antd';

interface UserInfoRowProps {
    label: string;
    value: any;
}

const UserInfoRow: React.FC<UserInfoRowProps> = ({ label, value }) => {
    let labelValue = typeof value === 'object' ? JSON.stringify(value) : value;
    if (label === 'image') {
        labelValue = <img src={value} alt={label} />;
    }
    return (
        <Row justify='space-between' className='full-width'>
            <Col span={12}>
                <strong>{label}</strong>
            </Col>
            <Col span={12}>{labelValue}</Col>
        </Row>
    );
};

export default UserInfoRow;
