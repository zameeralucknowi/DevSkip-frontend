import { io } from "socket.io-client";
import { BASE_URL } from "./requestMethods";

export const createSocketConnection = ()=>{
        return io(BASE_URL);
}