import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, RefreshCw, LogOut, FileText } from 'lucide-react'
import logo from "../../assets/logo.webp"
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/actions/auth'
import { connect } from 'react-redux'
import { createCodes, getCodes } from '../../redux/actions/code'
import Layout from '../../hocs/Layout'

function AdminEntries({ logout, createCodes, codes, getCodes }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [usedFilter, setUsedFilter] = useState('') // Filtro por estado de uso
  const [prizeFilter, setPrizeFilter] = useState('') // Filtro por premio
  const navigate = useNavigate()

  useEffect(() => {
    // Obtener códigos con filtros y paginación
    getCodes(currentPage, usedFilter, prizeFilter)
  }, [currentPage, usedFilter, prizeFilter, getCodes])

  const handleLogout = () => {
    logout()
    navigate("/sign-in")
  }

  const handleGenerateCodes = () => {
    createCodes()
    console.log('Generando todos los códigos...')
  }

  const handleRefresh = () => {
    // Refrescar la tabla con los filtros actuales
    getCodes(currentPage, usedFilter, prizeFilter)
    console.log('Refrescando con filtros:', { usedFilter, prizeFilter })
  }

  const formatFecha = (fecha) => {
    return fecha ? new Date(fecha).toLocaleString('es-CO') : "Aún no se ha registrado";
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-600 to-pink-600 p-4 relative">
        {/* Botón de cerrar sesión */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 flex items-center px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
        >
          Cerrar Sesión <LogOut className="ml-2 h-4 w-4" />
        </button>

        <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg">
          {/* Logo de GalaxiPapas */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="GalaxiPapas Logo" className="w-20 h-20 mb-4 animate-bounce" />
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-bold text-purple-600">Galaxi</span>
              <span className="text-4xl font-bold text-yellow-500">Papas</span>
            </div>
            <p className="text-cyan-500 text-sm mt-2 italic">¡Un mordisco fuera de este mundo!</p>
          </div>

          {/* Título del panel de administración */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Panel de Administración</h2>
            <p className="text-gray-600">Gestiona todos los códigos ingresados</p>
          </div>

          {/* Filtros y botón de refresco */}
          <div className="flex flex-wrap gap-4 mb-6 justify-between items-end">
            {/* Filtro por estado de uso */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">Filtrar por Estado</label>
              <select
                value={usedFilter}
                onChange={(e) => setUsedFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Todos</option>
                <option value="true">Usados</option>
                <option value="false">No Usados</option>
              </select>
            </div>

            {/* Filtro por premio */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">Filtrar por Premio</label>
              <select
                value={prizeFilter}
                onChange={(e) => setPrizeFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Todos</option>
                <option value="1.000.000 pesos">1 millón</option>
                <option value="50.000 pesos">50 mil</option>
                <option value="10.000 pesos">10 mil</option>
                <option value="Sin premio">Sin premio</option>
              </select>
            </div>

            {/* Botón de refresco */}
            <button
              onClick={handleRefresh}
              className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Refrescar <RefreshCw className="ml-2 h-4 w-4" />
            </button>

            {/* Botón para generar todos los códigos */}
            <button
              onClick={handleGenerateCodes}
              className="flex items-center px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
            >
              Generar Códigos <FileText className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Tabla de resultados */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Fecha</th>
                  <th className="p-2 border">Código</th>
                  <th className="p-2 border">Premio</th>
                  <th className="p-2 border">Estado</th>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Cédula</th>
                  <th className="p-2 border">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((code, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2 border">{formatFecha(code.date)}</td>
                    <td className="p-2 border">{code.code}</td>
                    <td className="p-2 border">{code.prize}</td>
                    <td className="p-2 border">{code.state}</td>
                    <td className="p-2 border">{code.user_name || 'N/A'}</td>
                    <td className="p-2 border">{code.user_document || 'N/A'}</td>
                    <td className="p-2 border">{code.user_phone || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 flex items-center bg-cyan-500 text-white font-bold rounded-lg transition duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-600'
                }`}
            >
              <ChevronLeft className="mr-1 h-5 w-5" />
              Anterior
            </button>

            <div className="text-sm font-semibold">
              Página {currentPage}
            </div>

            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={codes.length < 10}
              className={`px-4 py-2 flex items-center bg-cyan-500 text-white font-bold rounded-lg transition duration-300 ${codes.length < 10 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-600'
                }`}
            >
              Siguiente
              <ChevronRight className="ml-1 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  codes: state.code.codes,
})

export default connect(mapStateToProps, {
  logout,
  createCodes,
  getCodes
})(AdminEntries)
