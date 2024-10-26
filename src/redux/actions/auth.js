import axios from "axios";
import {
  SET_AUTH_LOADING,
  LOGIN_SUCCESS,
  REMOVE_AUTH_LOADING,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  REMOVE_ERROR_MESSAGE
} from "../reducers/auth";
import api from "../../services/authService";

// Acción para iniciar sesión

export const login =
  (email, password) => async (dispatch) => {
    dispatch(SET_AUTH_LOADING());
    dispatch(REMOVE_ERROR_MESSAGE());
    const config = {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true
      },
    };
    const body = JSON.stringify({
      username: email,
      password
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/sign-in`,
        body,
        config
      );

      if (res.status === 200) {
        const { session, user, employee } = res.data.body;
        dispatch(LOGIN_SUCCESS({ session, user, employee }));
      } else {
        dispatch(
          LOGIN_FAIL(res.data.body || "Error desconocido al iniciar sesión.")
        );
      }
    } catch (err) {
      let errorMessage = "Error desconocido al iniciar sesión.";
      if (err.response) {
        errorMessage = err.response.data.body || "Error en el servidor.";
      } else if (err.request) {
        errorMessage =
          "No se pudo contactar al servidor. Verifica tu conexión.";
      } else {
        errorMessage = err.message;
      }
      dispatch(LOGIN_FAIL(errorMessage));
    } finally {
      dispatch(REMOVE_AUTH_LOADING());
    }
  };

//Acción para registrar un usuario
export const signUp =
  (name, birthdate, document_number, email, phone, city, password) => async (dispatch) => {
    dispatch(SET_AUTH_LOADING());
    dispatch(REMOVE_ERROR_MESSAGE());
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };

    const body = JSON.stringify({
      name,
      email,
      rol: 'user',
      birthdate,
      document_number,
      phone,
      city,
      password
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`,
        body,
        config
      );

      if (res.status === 200) {
        const { success, message } = res.data.body;
        dispatch(REGISTER_SUCCESS({ success, message }));
      } else {
        dispatch(
          REGISTER_FAIL(res.data.body || "Error desconocido al tratar de registrarte.")
        );
      }
    } catch (err) {
      let errorMessage = "Error desconocido al registrarte.";
      if (err.response) {
        errorMessage = err.response.data.body || "Error en el servidor.";
      } else if (err.request) {
        errorMessage =
          "No se pudo contactar al servidor. Verifica tu conexión.";
      } else {
        errorMessage = err.message;
      }
      dispatch(REGISTER_FAIL(errorMessage));
    } finally {
      
      dispatch(REMOVE_AUTH_LOADING());
    }
  };

export const signUpAdmin =
  ( email, password) => async (dispatch) => {
    dispatch(SET_AUTH_LOADING());
    dispatch(REMOVE_ERROR_MESSAGE());
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };

    const body = JSON.stringify({
      email,
      rol: 'admin',
      password
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/register-admin`,
        body,
        config
      );

      if (res.status === 200) {
        const { success, message } = res.data.body;
        dispatch(REGISTER_SUCCESS({ success, message }));
      } else {
        dispatch(
          REGISTER_FAIL(res.data.body || "Error desconocido al tratar de registrarte.")
        );
      }
    } catch (err) {
      let errorMessage = "Error desconocido al registrarte.";
      if (err.response) {
        errorMessage = err.response.data.body || "Error en el servidor.";
      } else if (err.request) {
        errorMessage =
          "No se pudo contactar al servidor. Verifica tu conexión.";
      } else {
        errorMessage = err.message;
      }
      dispatch(REGISTER_FAIL(errorMessage));
    } finally {
      dispatch(REMOVE_AUTH_LOADING());
    }
  };

// Acción para cerrar sesión
export const logout = () => async (dispatch) => {
  dispatch(SET_AUTH_LOADING());
  dispatch(REMOVE_ERROR_MESSAGE());
  try {
    const res = await api.get(`/auth/logout`);
    if (res.status === 200) {
      dispatch(LOGOUT());
    }
  } catch (err) {
    let errorMessage = "Error desconocido al cerrar sesión.";
    if (err.response) {
      errorMessage = err.response.data.body || "Error en el servidor.";
    } else if (err.request) {
      errorMessage = "No se pudo contactar al servidor. Verifica tu conexión.";
    } else {
      errorMessage = err.message;
    }
    dispatch(LOGIN_FAIL(errorMessage));
  } finally {
    dispatch(REMOVE_AUTH_LOADING());
  }

};
