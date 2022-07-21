import React from 'react';
import { Space, Spin } from 'antd';
import './spinner.css'

const Spinner = () => (
    <div className='spinner'>
        <Space size="middle">
            <Spin size="large" />
        </Space>
    </div>

);

export default Spinner;