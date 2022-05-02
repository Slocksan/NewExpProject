import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';

function Layout ({children}) {
    return (
      <div>
        <NavMenu />
            <Container>
                {children}
            </Container>
        <Footer/>
      </div>
    )
};

export default Layout;
