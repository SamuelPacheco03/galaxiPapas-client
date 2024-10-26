import api from "../../services/authService";
import { GET_LOGS_SUCCESS, GET_CODES_SUCCESS } from "../reducers/code";
import {
    SET_LOADING,
    REMOVE_LOADING,
    SET_MODAL_MESSAGE,
    CLEAR_MODAL_MESSAGE
} from "../reducers/messages";

export const createCodes = () => async (dispatch) => {
    dispatch(CLEAR_MODAL_MESSAGE());
    dispatch(SET_LOADING());
    let message = null;
    let type_message = 'success'
    try {
        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true,
        };
        const res = await api.get(`/code/create-codes`, config);
        if (res.status === 200) {
            message = "Códigos creados correctamente.";
        }
    } catch (err) {
        type_message = 'error'
        message = "Error desconocido al crear los códigos.";
        if (err.response) {
            message = err.response.data.body || "Error en el servidor.";
        } else if (err.request) {
            message = "No se pudo contactar al servidor. Verifica tu conexión.";
        } else {
            message = err.message;
        }

    } finally {
        dispatch(SET_MODAL_MESSAGE({ message, type_message, time: 3000 }));
        dispatch(REMOVE_LOADING());
    }

};

export const getCodes = (page = 1, used = undefined, prize = undefined) => async (dispatch) => {
    dispatch(SET_LOADING());
    dispatch(CLEAR_MODAL_MESSAGE());
    let message = null;
    let type_message = 'success';
  
    try {
      // Configurar los encabezados de la solicitud
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
  
      // Construir la URL con los parámetros de paginación y filtros
      let url = `/code/get-codes?page=${page}`;
      if (used !== undefined) url += `&used=${used}`;
      if (prize) url += `&prize=${prize}`;
  
      // Hacer la solicitud al servidor
      const res = await api.get(url, config);
  
      if (res.status === 200) {
        const data = res.data.body;
        dispatch(GET_CODES_SUCCESS(data.codes)); // Actualizar el estado con los códigos obtenidos
      }
    } catch (err) {
      type_message = 'error';
      message = "Error al cargar los códigos.";
      if (err.response) {
        message = err.response.data.body || "Error en el servidor.";
      } else if (err.request) {
        message = "No se pudo contactar al servidor. Verifica tu conexión.";
      } else {
        message = err.message;
      }
      dispatch(SET_MODAL_MESSAGE({ message, type_message, time: 3000 }));
    } finally {
      dispatch(REMOVE_LOADING());
    }
  };

export const sendCode = (code) => async (dispatch) => {
    dispatch(SET_LOADING());
    dispatch(CLEAR_MODAL_MESSAGE());
    let message = null;
    let type_message = 'success'
    try {
        const body = JSON.stringify({
            code
        });

        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true,
        };

        const res = await api.post(`/code/send-code`, body, config);
        if (res.status === 200) {
            const data =  res.data.body;
            const success = data.success;
            message = data.message;

            type_message = success ? 'success' : 'error';

        }
    } catch (err) {
        type_message = 'error'
        message = "Error desconocido al crear al enviar el código.";
        if (err.response) {
            message = err.response.data.body || "Error en el servidor.";
        } else if (err.request) {
            message = "No se pudo contactar al servidor. Verifica tu conexión.";
        } else {
            message = err.message;
        }

    } finally {
        dispatch(SET_MODAL_MESSAGE({ message, type_message, time: 3000 }));
        dispatch(REMOVE_LOADING());
    }

};

export const getUserLogs = () => async (dispatch) => {
    dispatch(SET_LOADING());
    dispatch(CLEAR_MODAL_MESSAGE());
    let message = null;
    let type_message = 'success'
    try {
        const config = {
            headers: { "Content-Type": "application/json", },
            withCredentials: true,
        };
        const res = await api.get(`/code/get-user-logs`, config);
        if (res.status === 200) {
            const data = res.data.body;
            dispatch(GET_LOGS_SUCCESS(data.log));
        }
    } catch (err) {
        type_message = 'error'
        message = "Error desconocido cargar los códigos.";
        if (err.response) {
            message = err.response.data.body || "Error en el servidor.";
        } else if (err.request) {
            message = "No se pudo contactar al servidor. Verifica tu conexión.";
        } else {
            message = err.message;
        }
        dispatch(SET_MODAL_MESSAGE({ message, type_message, time: 3000 }));

    } finally {
        
        dispatch(REMOVE_LOADING());
    }

};