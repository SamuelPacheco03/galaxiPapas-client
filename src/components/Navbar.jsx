import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Inicio', 'Cómo Funciona', 'Premios', 'Contacto'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-yellow-500 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-900">Marca de Papas</h1>

          {/* Botón de menú para móviles */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Menú de navegación y botones de autenticación para desktop */}
          <div className="hidden lg:flex items-center justify-between flex-1 ml-10">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-900 hover:text-gray-700 transition-colors duration-300 text-lg font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4">
              <button className="flex items-center justify-center bg-gray-900 text-yellow-400 px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
                <LogIn className="mr-2" size={20} />
                Ingresar
              </button>
              <button className="flex items-center justify-center bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
                <UserPlus className="mr-2" size={20} />
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil mejorado */}
      <div
        className={`lg:hidden fixed inset-0 bg-yellow-500 z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Marca de Papas</h1>
            <button
              onClick={toggleMenu}
              className="text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          <ul className="flex-grow">
            {navItems.map((item) => (
              <li key={item} className="mb-4">
                <a
                  href="#"
                  className="block text-gray-900 hover:text-gray-700 transition-colors duration-300 text-xl font-medium"
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-4 mt-auto">
            <button className="flex items-center justify-center bg-gray-900 text-yellow-400 px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 w-full">
              <LogIn className="mr-2" size={20} />
              Ingresar
            </button>
            <button className="flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 w-full">
              <UserPlus className="mr-2" size={20} />
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;