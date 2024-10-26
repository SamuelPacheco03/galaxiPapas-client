import React from 'react';
import ModalMessage from '../components/ModalMessage';

const Layout = ({ children }) => {
    return (
        <div className='bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500 '>
            {/* <Navbar /> */}
            
            {children}
            <ModalMessage />
            <footer className="bg-yellow-500 py-4 text-center text-gray-900">
                &copy; 2023 GalaxiPapas. Todos los derechos reservados.
            </footer>
        </div>
    );
};

export default Layout;
