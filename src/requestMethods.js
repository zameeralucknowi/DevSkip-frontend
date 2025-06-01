import axios from "axios";

const BASE_URL = 'http://localhost:3000'

const publicRequest = axios.create({
    baseURL : BASE_URL
})

export default publicRequest;