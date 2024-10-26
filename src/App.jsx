import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Home from './containers/Home'
import Login from "./containers/auth/login";
import Register from "./containers/auth/register";
import AdminLogin from "./containers/admin/AdminLogin";
import AdminEntries from "./containers/admin/AdminEntries";
import CodeEntry from "./containers/CodeEntry";
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
