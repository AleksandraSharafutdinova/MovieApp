import React, {Component} from 'react';
import { Input } from 'antd';

import './search-panel.css'

export default class SearchPanel extends Component {

render() {
    const {onSearch} = this.props
    const { Search } = Input;

        return(
            <div className='search-panel'>
                <Search placeholder="Type movie to search" onSearch={onSearch} />
            </div>

        )
    }
}