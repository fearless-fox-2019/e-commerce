import axios from 'axios'

const backend = axios.create({
  baseURL: `http://35.185.187.213`
})

export default backend
