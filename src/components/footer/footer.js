import React from 'react';
import { Pagination } from 'antd';

import './footer.css'

const Footer = ({moviesPerPage, totalMovies, onClickPage, currentPage}) => {

    const pageNumber =[];
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumber.push(i)
    }

    return (
            <div className='footer'>
                <Pagination size='small' total={pageNumber.length} current={currentPage} onChange={onClickPage} />
            </div>
    )
}

export default Footer;