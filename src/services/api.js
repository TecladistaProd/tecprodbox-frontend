import axios from 'axios'

const api = axios.create({
  baseURL: 'https://tecprodbox-backend.herokuapp.com'
})

export default api