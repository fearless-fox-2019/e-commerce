import axios from 'axios';

const axiosLink = axios.create({
  baseURL: 'http://localhost:3000',
});

export default axiosLink;
