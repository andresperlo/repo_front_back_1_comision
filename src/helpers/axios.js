import axios from 'axios'
const token = JSON.parse(sessionStorage.getItem('token'))

const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_LOCAL}/api`
})

export const configHeaders = {
  headers: {
    "content-type": "application/json",
    "auth": `${token}`
  }
};

export const configHeadersImage = {
  headers: {
    "content-type": "multipart/form-data",
    "auth": `${token}`
  }
};

export default clienteAxios