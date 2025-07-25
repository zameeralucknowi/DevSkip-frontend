import axios from "axios";

export const BASE_URL = 'https://devskip-apis.onrender.com'

const publicRequest = axios.create({
    baseURL : BASE_URL
})

export default publicRequest;