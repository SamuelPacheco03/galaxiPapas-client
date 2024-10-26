import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Home from './containers/Home'
import Login from "./containers/auth/Login.jsx";
import Register from "./containers/auth/Register.jsx";
import AdminLogin from "./containers/admin/AdminLogin.jsx";
import AdminEntries from "./containers/admin/AdminEntries.jsx";
import CodeEntry from "./containers/CodeEntry.jsx";
import useAuth from "./hooks/authHook";
import { ConnectedProtectedAuthRoute, ConnectedProtectedRoute } from "./utils/ProtectedRoute";


function App() {
  const { loadUser } = useAuth();
  loadUser();
  return (
    <Router>
      <Routes>
        {/* Error Display */}
        <Route path="*" element={<h1>Error 404</h1>} />

        <Route path="/" element={<Home />} />
        

        {/* Rutas AUTH*/}
        <Route element={<ConnectedProtectedAuthRoute />}>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>

        <Route element={<ConnectedProtectedRoute allowedRoles={['user']} />}>
        <Route path="/panel" element={<CodeEntry />} />
        </Route>

        <Route element={<ConnectedProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin-panel" element={<AdminEntries />} />
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App
