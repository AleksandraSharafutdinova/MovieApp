import React, {Component} from 'react';
import { Pagination } from 'antd';

import './footer.css'

export default class Footer extends Component {

    render() {

        return (
            <div className='footer'>
                <Pagination size="small" total={50} />
            </div>
        )
    }
}