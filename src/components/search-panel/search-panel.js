import React, {Component} from 'react';
import { Input } from 'antd';
import {debounce} from "lodash";
import PropTypes from 'prop-types';

import './search-panel.css';

export default class SearchPanel extends Component {

render() {
    const {onSearch} = this.props;
    const {Search} = Input;

        return(
            <div className='search-panel'>
                <Search placeholder="Type movie to search" onChange={debounce(onSearch, 1500)} />
            </div>
        )
    }
};

SearchPanel.defaultProps = {
    onSearch: () => {},
}

SearchPanel.propTypes ={
    onSearch: PropTypes.func,
}