import { useState, useEffect } from 'react'
import { Mail, Lock, ChevronRight, UserPlus } from 'lucide-react'
// Importar el logo creado
import logo from "../../assets/logo.webp"
import { login } from '../../redux/actions/auth'
import { connect } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

function Login({ login, session, rol, error_message }) {
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      if (rol === 'admin') {
        navigate('/admin-panel');
      } else {
        navigate('/panel');
      }
    }
  }, [session, rol, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { email: "", password: "" };
    let hasErrors = false;

    // Validar si es correo o usuario
    if (!form.email) {
      newErrors.email = "El usuario o correo es obligatorio.";
      hasErrors = true;
    } else if (form.email.includes("@")) {
      if (!validateEmail(form.email)) {
        newErrors.email = "El formato del correo es incorrecto.";
        hasErrors = true;
      }
    } else {
      if (form.email.length < 4) {
        newErrors.email = "El nombre de usuario debe tener al menos 4 caracteres.";
        hasErrors = true;
      }
    }

    // Validar contraseña
    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria.";
      hasErrors = true;
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      login(form.email, form.password);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Sección del logo de GalaxiPapas */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="GalaxiPapas Logo" className="w-20 h-20 mb-4 animate-bounce" />
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold text-purple-600">Galaxi</span>
            <span className="text-4xl font-bold text-yellow-500">Papas</span>
          </div>
          <p className="text-cyan-500 text-sm mt-2 italic">¡Un mordisco fuera de este mundo!</p>
        </div>

        {/* Formulario de inicio de sesión */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
          <p className="text-gray-600">Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="correo"
                type="email"
                name="email"
                placeholder="tu@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            {/* Mostrar error de validación de correo */}
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="contraseña"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            {/* Mostrar error de validación de contraseña */}
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-cyan-500 text-white py-3 rounded-lg mt-4 hover:bg-cyan-600 transition duration-300"
          >
            Ingresar <ChevronRight className="ml-2 h-4 w-4" />
          </button>

          {/* Botón para registrarse */}
          <Link to="/sign-up">
            <button
              type="button"
              className="w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg mt-4 hover:from-purple-600 hover:to-pink-600 transition duration-300"
            >
              Registrarse <UserPlus className="ml-2 h-4 w-4" />
            </button>
          </Link>

          {/* Mostrar mensaje de error del servidor */}
          {error_message && (
            <p className="text-red-500 text-center text-sm mt-4">{error_message}</p>
          )}
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  session: state.auth.session,
  rol: state.auth.role,
  error_message: state.auth.error_message,
});

export default connect(mapStateToProps, {
  login,
})(Login);
