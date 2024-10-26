import { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  allowedRoles = [],
  session,
  role,
  loading,
  hasCompletedEvaluation,
  hassAcceptedProfile,
  hasAcceptedTerms,
  hasAssingedForm,
  type
}) => {
  const sessionActive = sessionStorage.getItem('session');

  // Mostrar spinner mientras se verifica la sesión
  // if (loading || (!session && role === 0)) {
  //   return <SpinnerOverlay />;
  // }  
  if (!session || !sessionActive) {
    return <Navigate to="/sign-in" replace />;
  }

  // Verificar si el rol del usuario tiene acceso a la ruta
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    if (role === 1) {
      return <Navigate to="/" replace />;
    }

    if (role === 5) {
      return <Navigate to="/employee-home" replace />;
    }
  }

  // Lógica adicional para rutas específicas según el tipo
  if (type === "questionnaire") {
    if (
      hasCompletedEvaluation ||
      !hasAcceptedTerms ||
      !hasAssingedForm ||
      !hassAcceptedProfile
    ) {
      return <Navigate to="/employee-home" replace />;
    }
  }

  if (type === "terms-and-conditions") {
    if (!hasAssingedForm) {
      return <Navigate to="/employee-home" replace />;
    }
  }

  // Si todo está bien, renderizar el contenido protegido
  return <Outlet />;
};

// Para rutas donde los usuarios autenticados no deberían acceder (como login)
const ProtectedAuthRoute = ({ session, role }) => {
  const sessionActive = sessionStorage.getItem('session');
  console.log(session)
  console.log(role)
  if (session && sessionActive) {
    if (role === 'user') {
      return <Navigate to="/panel" replace />;
    }

    if (role === 'admin') {
      return <Navigate to="/admin-panel" replace />;
    }
  }

  return <Outlet />;
};

const mapStateToProps = (state) => ({
  session: state.auth.session,
  role: state.auth.role,
  loading: state.auth.loading,
  hasCompletedEvaluation: state.auth?.employee?.form_done,
  hassAcceptedProfile: state.auth?.employee?.accept_profile,
  hasAcceptedTerms: state.auth?.employee?.accept_terms,
  hasAssingedForm: state.auth?.employee?.format_type,
});

export const ConnectedProtectedRoute = connect(mapStateToProps)(ProtectedRoute);
export const ConnectedProtectedAuthRoute = connect(mapStateToProps)(ProtectedAuthRoute);
