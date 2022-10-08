import React from 'react';

import Header from '../Header';
import PropTypes from 'prop-types';


const Layout = ({children}) => {
    return (
        <>
            <Header />
            <main> {children} </main>
        </>
    );
};

Layout.propType = {
    children: PropTypes.node
}


export default Layout;