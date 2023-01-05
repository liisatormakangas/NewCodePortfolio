import axios from "axios";
const userUrl = "http://localhost:3001/user/";
const loginUrl = "http://localhost:3001/user/login/";
const refreshUrl = "http://localhost:3001/user/refreshToken/";


export const addUser = async (newUser) => {
    const response = await axios.post(`${userUrl}`, newUser);    
    return response.data;
};

export const tryLogin = async (username, password) => {
    const response = await axios.post(`${loginUrl}`,
        {
            username,
            password
        });
    return response.data;
};

export const refreshToken = async (token) => {
    const response = await axios.get(`${refreshUrl}`, token);
    return response.data;
};
