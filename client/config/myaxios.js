import axios from 'axios'

const db = axios.create({
    baseURL: 'http://34.87.4.189'
})

export default db