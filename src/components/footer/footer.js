import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import './footer.css'

const Footer = ({moviesPerPage, totalMovies, onClickPage}) => {

    const pageNumber =[];
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumber.push(i)
    }

    return (
            <div className='footer'>
                <Pagination
                            size='small'
                            showSizeChanger={false}
                            total={pageNumber.length}
                            defaultCurrent={1}
                            onChange={onClickPage}
                            pageSize={moviesPerPage}
                            //current={currentPage}
                />
            </div>
    )
}

Footer.defaulProps = {
    onClickPage: () => {},
}

Footer.propTypes ={
    onClickPage: PropTypes.func,
}

export default Footer;