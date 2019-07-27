import axios from 'axios'

const axi = axios.create({
    baseURL: `http://localhost:3000`,
    // baseURL: deploy
})

export default axi